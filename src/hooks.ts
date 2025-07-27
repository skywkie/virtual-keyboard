const useToggleTheme = (defaultTheme?: "dark" | "light") => {
  const isDark = defaultTheme ? defaultTheme : window.matchMedia("(prefers-color-scheme: dark)").matches;
  let userTheme: "dark" | "light" = isDark ? "dark" : "light";

  const toggleTheme = () => {
    userTheme === "dark" ? (userTheme = "light") : (userTheme = "dark");

    userTheme === "dark"
      ? (document.body.className = "dark_mode")
      : (document.body.className = "light_mode");
  };

  return { userTheme, toggleTheme };
};

export { useToggleTheme };
