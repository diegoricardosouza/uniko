import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BreadcrumbSettings } from "../_components/BreadcrumbSettings";
import { ProtectedRoute } from "../_components/ProtectedRoute";
import CompanyUnitsForm from "./_components/CompanyUnitsForm";
import SocialLinksForm from "./_components/SocialLinksForm";

export default function Settings() {
  return (
    <ProtectedRoute requiredRoles={["ADMIN"]}>
      <BreadcrumbSettings />

      <div className="flex flex-1 flex-col p-4 pt-0 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">Gerencie as configurações gerais do sistema</p>
        </div>

        <Tabs defaultValue="company" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="company" className="transition-smooth">Empresa</TabsTrigger>
            <TabsTrigger value="social" className="transition-smooth">Redes Sociais</TabsTrigger>
            <TabsTrigger value="seo" className="transition-smooth">SEO</TabsTrigger>
          </TabsList>

          <TabsContent value="company">
            <CompanyUnitsForm />
          </TabsContent>

          <TabsContent value="social">
            <SocialLinksForm />
          </TabsContent>

          <TabsContent value="seo">
            Seo Content
            {/* <Card className="bg-gradient-card shadow-card border-0">
              <CardHeader>
                <CardTitle>Configurações de SEO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="seo-title">Título do Site *</Label>
                    <Input
                      id="seo-title"
                      value={seoSettings.title}
                      onChange={(e) => setSeoSettings(prev => ({ ...prev, title: e.target.value }))}
                      className="transition-smooth focus:shadow-primary"
                    />
                    <p className="text-xs text-muted-foreground">Máximo 60 caracteres</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="seo-description">Descrição do Site *</Label>
                    <Textarea
                      id="seo-description"
                      value={seoSettings.description}
                      onChange={(e) => setSeoSettings(prev => ({ ...prev, description: e.target.value }))}
                      className="transition-smooth focus:shadow-primary"
                    />
                    <p className="text-xs text-muted-foreground">Máximo 160 caracteres</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="seo-keywords">Palavras-chave</Label>
                    <Textarea
                      id="seo-keywords"
                      value={seoSettings.keywords}
                      onChange={(e) => setSeoSettings(prev => ({ ...prev, keywords: e.target.value }))}
                      className="transition-smooth focus:shadow-primary"
                      placeholder="Separe as palavras-chave por vírgula"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSaveSEO}
                  className="bg-gradient-primary hover:bg-primary-light transition-smooth shadow-primary"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Salvar SEO
                </Button>
              </CardContent>
            </Card> */}
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
}