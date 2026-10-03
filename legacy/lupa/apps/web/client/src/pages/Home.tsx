import { ArrowRight, Zap, Eye, BookOpen } from "lucide-react";
import { Link } from "wouter";
import { useTranslation } from "@/hooks/useTranslation";
import LanguageSelector from "@/components/LanguageSelector";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  const t = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Navegación */}
      <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border border-border rounded-2xl shadow-xl">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Eye className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              {t("nav.title")}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <LanguageSelector />
            <Link href="/demo">
              <a className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:shadow-lg transition-all duration-150 active:scale-95">
                {t("nav.demo")}
              </a>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Contenido */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-foreground">
                {t("hero.title")}
              </h1>
              <p className="text-xl text-foreground/70 leading-relaxed">
                {t("hero.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/demo">
                  <a className="px-6 py-3 rounded-lg font-semibold transition-all duration-150 bg-primary text-primary-foreground hover:shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                    {t("hero.cta1")}
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </Link>
                <button className="px-6 py-3 rounded-lg font-semibold transition-all duration-150 border-2 border-primary text-primary hover:bg-primary/10 active:scale-95">
                  {t("hero.cta2")}
                </button>
              </div>
            </div>

            {/* Imagen Hero */}
            <div className="relative">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663718320424/ZkL8zFRJUgi2pH4EyTcCFA/lupa-hero-overlay-2n2Rf5EUhUpx6APPkpzSHq.webp"
                alt="LUPA"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="py-20 md:py-32 bg-card/40 backdrop-blur-sm">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t("why.title")}
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              {t("why.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-background/80 backdrop-blur-lg border border-border rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-200 hover:scale-105">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {t("why.feature1.title")}
              </h3>
              <p className="text-foreground/70">
                {t("why.feature1.description")}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-background/80 backdrop-blur-lg border border-border rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-200 hover:scale-105">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {t("why.feature2.title")}
              </h3>
              <p className="text-foreground/70">
                {t("why.feature2.description")}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-background/80 backdrop-blur-lg border border-border rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-200 hover:scale-105">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {t("why.feature3.title")}
              </h3>
              <p className="text-foreground/70">
                {t("why.feature3.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo Funciona */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {t("how.title")}
              </h2>
              <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
                {t("how.description")}
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-accent">1</span>
                  </div>
                  <span className="text-foreground/80">{t("how.step1")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-accent">2</span>
                  </div>
                  <span className="text-foreground/80">{t("how.step2")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-accent">3</span>
                  </div>
                  <span className="text-foreground/80">{t("how.step3")}</span>
                </li>
              </ul>
            </div>
            <div>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663718320424/ZkL8zFRJUgi2pH4EyTcCFA/lupa-concept-translation-SigQuwcYeyX8PoeN3Pted9.webp"
                alt="LUPA"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Explicación Línea por Línea */}
      <section className="py-20 md:py-32 bg-card/40 backdrop-blur-sm">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663718320424/ZkL8zFRJUgi2pH4EyTcCFA/lupa-code-explanation-6MxSoHgufFtCT9A9nMgKaW.webp"
                alt="LUPA"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {t("explain.title")}
              </h2>
              <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
                {t("explain.description")}
              </p>
              <div className="space-y-4">
                <div className="bg-background/80 backdrop-blur-lg border border-border rounded-2xl shadow-xl p-4">
                  <p className="font-semibold text-foreground mb-2">
                    {t("explain.item1.title")}
                  </p>
                  <p className="text-sm text-foreground/70">
                    {t("explain.item1.description")}
                  </p>
                </div>
                <div className="bg-background/80 backdrop-blur-lg border border-border rounded-2xl shadow-xl p-4">
                  <p className="font-semibold text-foreground mb-2">
                    {t("explain.item2.title")}
                  </p>
                  <p className="text-sm text-foreground/70">
                    {t("explain.item2.description")}
                  </p>
                </div>
                <div className="bg-background/80 backdrop-blur-lg border border-border rounded-2xl shadow-xl p-4">
                  <p className="font-semibold text-foreground mb-2">
                    {t("explain.item3.title")}
                  </p>
                  <p className="text-sm text-foreground/70">
                    {t("explain.item3.description")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Viaje de Aprendizaje */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {t("journey.title")}
              </h2>
              <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
                {t("journey.description")}
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary">1</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {t("journey.level1")}
                    </p>
                    <p className="text-sm text-foreground/70">
                      {t("journey.level1.description")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary">2</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {t("journey.level2")}
                    </p>
                    <p className="text-sm text-foreground/70">
                      {t("journey.level2.description")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary">3</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {t("journey.level3")}
                    </p>
                    <p className="text-sm text-foreground/70">
                      {t("journey.level3.description")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663718320424/ZkL8zFRJUgi2pH4EyTcCFA/lupa-learning-journey-ZhwabDHpa6D2TUEAQP4qSi.webp"
                alt="LUPA"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t("cta.title")}
          </h2>
          <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
            {t("cta.description")}
          </p>
          <Link href="/demo">
            <a className="px-6 py-3 rounded-lg font-semibold transition-all duration-150 bg-primary text-primary-foreground hover:shadow-lg hover:scale-105 active:scale-95 inline-flex items-center gap-2">
              {t("cta.button")}
              <ArrowRight className="w-5 h-5" />
            </a>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/20 backdrop-blur-sm py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">
                {t("nav.title")}
              </span>
            </div>
            <p className="text-sm text-foreground/70">{t("footer.text")}</p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                {t("footer.privacy")}
              </a>
              <a
                href="#"
                className="text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                {t("footer.terms")}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
