import { getPostsPaginateAction } from "@/app/actions/posts/get-posts-paginate";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CardPost } from "@/components/CardPost";
import { CardPropertyVista } from "@/components/CardPropertyVista";
import { DifferentiatedService } from "@/components/DifferentiatedService";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Pagination } from "@/components/Pagination";
import { PropertyVistaList } from "@/entities/PropertyVista";
import { FilterProperty } from "./_components/FilterProperty";

interface PropertiesProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    limit?: string;
    city?: string;
    finalidade?: string;
    type?: string;
    codigo?: string;
    endereco?: string;
    orderDirection?: string;
  }>;
}

export default async function Imoveis({ searchParams }: PropertiesProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 9;

  const recentPosts = await getPostsPaginateAction({
    limit: 3
  });

  const ufFilter = params.city === 'curitiba' ? 'PR' : (params.city === 'belo-horizonte' ? 'MG' : undefined);
  const finalidadeFilter = params.finalidade === 'comprar' ? 'Venda' : (params.finalidade === 'alugar' ? 'Aluguel' : undefined);
  const cityFilter = params.city === 'curitiba' ? 'Curitiba' : (params.city === 'belo-horizonte' ? 'Belo Horizonte' : params.city);
  
  // Construir filtro dinamicamente, apenas com valores válidos
  const filterObject: Record<string, string> = {};

  if (ufFilter) filterObject.UF = ufFilter;
  if (params.type) filterObject.Categoria = params.type;
  if (params.finalidade === 'lancamentos') filterObject.Lancamento = 'Sim';
  if (finalidadeFilter) filterObject.Status = finalidadeFilter;
  if (params.city) filterObject.Cidade = cityFilter || '';
  if (params.codigo) filterObject.Codigo = params.codigo;
  if (params.endereco) filterObject.Endereco = params.endereco;

  const filters = {
    fields: [
      'TituloSite', 'Dormitorios', 'UF', 'Bairro', 'Cidade', 'ValorVenda',
      'ValorLocacao', 'AreaPrivativa', 'AreaTotal', 'FotoDestaque', 'Codigo',
      'TotalBanheiros', 'Status', 'Categoria', 'Endereco', 'Numero', 'Complemento', 'Lancamento', 'DataEntrega'
    ],
    filter: filterObject,
    order: {
      DataCadastro: params.orderDirection === 'asc' ? 'asc' : 'desc'
    },
    paginacao: {
      "pagina": page,
      "quantidade": limit
    },
  };

  const searchParamsApi = JSON.stringify(filters);
  const encodedParams = encodeURIComponent(searchParamsApi);
  const url = `${process.env.NEXT_PUBLIC_VISTA_API_URL}/imoveis/listar?key=${process.env.VISTA_API_KEY}&v2=1&pesquisa=${encodedParams}&showtotal=1`;

  let properties: {
    data: PropertyVistaList[];
    meta: {
      total: number;
      totalPages: number;
      page: number;
      limit: number;
    };
  } = {
    data: [],
    meta: {
      total: 0,
      totalPages: 0,
      page: page,
      limit: limit
    }
  };

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data = await response.json();
    properties = {
      data: data.result,
      meta: {
        total: data.paginacao?.total ,
        totalPages: data.paginacao?.paginas,
        page: data.paginacao?.pagina,
        limit: data.paginacao?.quantidade
      }
    };

  } catch (error) {
    console.error('Erro ao buscar imóveis:', error);
  }

  return (
    <div>
      <Header />
      <main>
        <Breadcrumb title={params.finalidade?.toUpperCase() || params.type?.toUpperCase() || 'IMÓVEIS'} />
        {properties.meta.total > 0 && <FilterProperty total={properties.meta.total} />}

        <section className="container flex flex-col gap-[30px] !mt-[30px]">
          {properties.data?.length > 0 ? (
            properties.data.map((property: PropertyVistaList, index) => (
              <CardPropertyVista
                key={property.Codigo || index}
                property={property}
                type={params.finalidade}
              />
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">Nenhum imóvel encontrado.</p>
            </div>
          )}
        </section>

        <div className="container !mt-[60px] !mb-[50px]">
          {properties.meta.totalPages > 1 && (
            <Pagination
              page={properties.meta.page}
              limit={properties.meta.limit}
              total={properties.meta.total}
              showInfo={false}
            />
          )}
        </div>

        <DifferentiatedService />

        <section className="container !mt-10">
          <header className="text-center mb-[30px]">
            <h2 className="text-gold text-[30px] md:text-[36px] font-montserrat font-light leading-[35px] md:leading-[47px]">
              As novidades mais recentes <strong className="font-medium">estão aqui!</strong>
            </h2>
            <h4 className="text-[19px] md:text-[22px] font-semibold text-title leading-[22px] md:leading-[27px] font-montserrat">
              blog
            </h4>
          </header>
          <div className="flex flex-col md:grid grid-cols-3 gap-[26px] mb-[50px]">
            {recentPosts.data.map(post => (
              <CardPost key={post.id} post={post} className="border-0" type="simple" />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}