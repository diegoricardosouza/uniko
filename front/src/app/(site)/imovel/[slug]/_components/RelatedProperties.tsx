import { CardPropertySingle } from "@/components/CardPropertySingle";
import { PropertyVistaList } from "@/entities/PropertyVista";

interface RelatedPropertiesProps {
  idCurrentProperty?: string
  ufCurrentProperty?: string
  finality?: string
}

export async function RelatedProperties({ idCurrentProperty, ufCurrentProperty, finality }: RelatedPropertiesProps) {  
  const filters = {
    fields: [
      'TituloSite', 'Dormitorios', 'UF', 'Bairro', 'Cidade', 'ValorVenda',
      'ValorLocacao', 'AreaPrivativa', 'FotoDestaque', 'Codigo',
      'Status', 'Categoria', 'Endereco', 'Numero', 'Complemento'
    ],
    filter: {
      "UF": ufCurrentProperty,
      "Status": finality ? finality : undefined
    },
    paginacao: {
      "pagina": "1",
      "quantidade": "4"
    },
  };
  
  const searchParamsApi = JSON.stringify(filters);
  const encodedParams = encodeURIComponent(searchParamsApi);
  const url = `${process.env.NEXT_PUBLIC_VISTA_API_URL}/imoveis/listar?key=${process.env.VISTA_API_KEY}&v2=1&pesquisa=${encodedParams}&showtotal=1`;

  const property = await fetch(url, {
    headers: {
      'Accept': 'application/json',
    },
    cache: 'no-store'
  });

  const data = await property.json();
  
  const filteredProperties: PropertyVistaList[] = data.result
    .filter((property: PropertyVistaList) => property.Codigo !== idCurrentProperty)
    .slice(0, 3);

  return (
    <section className="bg-bggray py-[50px]">
      <div className="container">
        <header className="text-center mb-[20px]">
          <h2
            className="text-gold text-[30px] md:text-[36px] font-montserrat font-light leading-[35px] md:leading-[47px]"
          >
            Cada imóvel tem seu jeito <strong className="font-medium">Úniko</strong> e você tem o seu!
          </h2>
        </header>

        <div className="flex flex-col md:grid grid-cols-3 gap-[6px]">
          {filteredProperties.map((property, index) => (
            <CardPropertySingle key={index} property={property} type="columns" />
          ))}
        </div>
      </div>
    </section>
  )
}