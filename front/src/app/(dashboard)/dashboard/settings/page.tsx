import { getSettingsAction } from "@/app/actions/settings/get-settings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Laptop, Share2 } from "lucide-react";
import { BreadcrumbSettings } from "../_components/BreadcrumbSettings";
import { ProtectedRoute } from "../_components/ProtectedRoute";
import CompanyUnitsForm from "./_components/CompanyUnitsForm";
import { SeoForm } from "./_components/SeoForm";
import SocialLinksForm from "./_components/SocialLinksForm";

export default async function Settings() {
  const setting = await getSettingsAction();

  return (
    <ProtectedRoute requiredRoles={["ADMIN"]}>
      <BreadcrumbSettings />

      <div className="flex flex-1 flex-col p-4 pt-0 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">Gerencie as configurações gerais do sistema</p>
        </div>

        <hr />

        <Tabs defaultValue="company" className="space-y-6 flex lg:flex-row gap-6">
          <div className="w-full lg:max-w-[265px]">
            <TabsList className="w-full flex lg:flex-col !h-auto gap-1 bg-white">
              <TabsTrigger 
                value="company" 
                className="data-[state=active]:bg-secondary !shadow-none transition-smooth w-full py-2 px-4 text-sm lg:justify-start"
              >
                <Building2 className="h-6 w-6 mr-2" />
                Empresa
              </TabsTrigger>
              <TabsTrigger 
                value="social" 
                className="data-[state=active]:bg-secondary !shadow-none transition-smooth w-full py-2 px-4 text-sm lg:justify-start"
              >
                <Share2 className="h-6 w-6 mr-2" />
                Redes Sociais
                </TabsTrigger>
              <TabsTrigger 
                value="seo" 
                className="data-[state=active]:bg-secondary !shadow-none transition-smooth w-full py-2 px-4 text-sm lg:justify-start"
              >
                <Laptop className="h-6 w-6 mr-2" />
                SEO
                </TabsTrigger>
            </TabsList>
          </div>

          <div className="w-full">
            <TabsContent value="company">
              <CompanyUnitsForm setting={setting} />
            </TabsContent>

            <TabsContent value="social">
              <SocialLinksForm setting={setting} />
            </TabsContent>

            <TabsContent value="seo">
              <SeoForm setting={setting} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
}