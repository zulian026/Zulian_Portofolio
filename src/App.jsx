import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Layout from "./Layout/MainLayout";
import LocomotiveScrollProvider from "./providers/LocomotiveScrollProvider";
import Footer from "./components/Footer";

// Error Boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Component error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-2xl font-bold mb-4">Oops, terjadi kesalahan</h2>
          <button
            className="px-4 py-2 bg-primary text-white rounded-md"
            onClick={() => {
              this.setState({ hasError: false });
              window.location.href = '/';
            }}
          >
            Kembali ke Beranda
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Lazy load components
const Home = lazy(() => import("./pages/home"));
const About = lazy(() => import("./pages/about"));
const Projects = lazy(() => import("./pages/projects"));
const Contact = lazy(() => import("./pages/contact"));

// Loading fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    <span className="sr-only">Loading...</span>
  </div>
);

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Layout>
          <Navbar />
          <LocomotiveScrollProvider options={{ 
            smooth: true,
            tablet: { smooth: true },
            smartphone: { smooth: true } 
          }}>
            <ErrorBoundary>
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={
                    <div className="flex items-center justify-center h-screen">
                      <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">404</h1>
                        <p className="mb-6">Halaman tidak ditemukan</p>
                        <a href="/" className="px-4 py-2 bg-primary text-white rounded-md">
                          Kembali ke Beranda
                        </a>
                      </div>
                    </div>
                  } />
                </Routes>
              </Suspense>
            </ErrorBoundary>
            <Footer />
          </LocomotiveScrollProvider>
        </Layout>
      </ErrorBoundary>
    </Router>
  );
}

export default App;