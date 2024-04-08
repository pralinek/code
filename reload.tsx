useEffect(() => {
    const handleRouteChangeComplete = () => {
      window.location.reload();
    };

    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router.events]);