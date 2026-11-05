import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ButtonGradient from "./assets/svg/ButtonGradient";
import Layout from "./components/layout/Layout";
import ScrollToTop from "./components/layout/ScrollToTop";
import PageLoader from "./components/layout/PageLoader";
import Home from "./pages/Home";

const Features = lazy(() => import("./pages/Features"));
const FeatureDetail = lazy(() => import("./pages/FeatureDetail"));
const Product = lazy(() => import("./pages/Product"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const RoadmapPage = lazy(() => import("./pages/RoadmapPage"));
const Integrations = lazy(() => import("./pages/Integrations"));
const IntegrationDetail = lazy(() => import("./pages/IntegrationDetail"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Careers = lazy(() => import("./pages/Careers"));
const JobDetail = lazy(() => import("./pages/JobDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ChatApp = lazy(() => import("./pages/ChatApp"));
const Legal = lazy(() => import("./pages/Legal"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="features" element={<Features />} />
          <Route path="features/:slug" element={<FeatureDetail />} />
          <Route path="how-to-use" element={<Product />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="roadmap" element={<RoadmapPage />} />
          <Route path="integrations" element={<Integrations />} />
          <Route path="integrations/:slug" element={<IntegrationDetail />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="careers" element={<Careers />} />
          <Route path="careers/:slug" element={<JobDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="privacy" element={<Legal type="privacy" />} />
          <Route path="terms" element={<Legal type="terms" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route
          path="app"
          element={
            <Suspense fallback={<PageLoader className="min-h-screen" />}>
              <ChatApp />
            </Suspense>
          }
        />
      </Routes>

      <ButtonGradient />
    </>
  );
};

export default App;
