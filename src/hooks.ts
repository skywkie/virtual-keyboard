const useToggleTheme = (defaultTheme?: "dark" | "light") => {
  const isDark = defaultTheme ? defaultTheme : window.matchMedia("(prefers-color-scheme: dark)").matches;
  let userTheme: "dark_mode" | "light_mode" = isDark ? "dark_mode" : "light_mode";

  document.body.className = userTheme;

  const toggleTheme = () => {
    userTheme === "dark_mode" ? (userTheme = "light_mode") : (userTheme = "dark_mode");

    userTheme === "dark_mode"
      ? (document.body.className = "dark_mode")
      : (document.body.className = "light_mode");
  };

  return { userTheme, toggleTheme };
};

export { useToggleTheme };
