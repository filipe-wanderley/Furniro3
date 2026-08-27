import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { getMe } from "../services/auth.service";
import { useAuthStore } from "../context/authStore";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";

const StoreLayout = () => {
  const [isCartDrawerOpen, setCartDrawerOpen] = useState(false);
  const {
    token,
    isInitialized,
    hasHydrated,
    setInitialized,
    setSession,
    clearSession,
  } = useAuthStore();
  const cartButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isInitialized) return;
    if (!hasHydrated) return;
    if (!token) {
      setInitialized();
      return;
    }
    getMe()
      .then((user) => setSession(token, user))
      .catch(() => clearSession());
  }, [
    clearSession,
    hasHydrated,
    isInitialized,
    setInitialized,
    setSession,
    token,
  ]);

  return (
    <>
      <Header
        onCartClick={() => setCartDrawerOpen(true)}
        cartButtonRef={cartButtonRef}
      />
      <Outlet />
      <Footer />
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartButtonRef={cartButtonRef}
      />
    </>
  );
};

export default StoreLayout;
