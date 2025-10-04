import { getPropertiesPaginateAction } from "@/app/actions/properties/get-properties-paginate";
import { CardPropertySingle } from "@/components/CardPropertySingle";

interface RelatedPropertiesProps {
  idCurrentProperty?: string
}

export async function RelatedProperties({ idCurrentProperty }: RelatedPropertiesProps) {
  const properties = await getPropertiesPaginateAction({ limit: 4, finalities: ["lancamentos"] });
  const filteredProperties = properties.data
    .filter((property) => property.id !== idCurrentProperty)
    .slice(0, 3);

  return (
    <section className="bg-bggray py-[50px]">
      <div className="container">
        <header className="text-center mb-[20px]">
          <h2
            className="text-gold text-[30px] md:text-[38px] font-montserrat tracking-[-0.95px] font-normal leading-[35px] md:leading-[47px] mb-[5px]"
          >
            Cada imóvel tem seu jeito <strong className="font-semibold">Úniko</strong> e você tem o seu!
          </h2>
        </header>

        <div className="flex flex-col md:grid grid-cols-3 gap-[6px]">
          {filteredProperties.map((property) => (
            <CardPropertySingle key={property.id} property={property} type="columns" />
          ))}
        </div>
      </div>
    </section>
  )
}