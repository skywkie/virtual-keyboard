const useToggleTheme = (defaultTheme?: "dark" | "light") => {
  const isDark = defaultTheme ? defaultTheme : window.matchMedia("(prefers-color-scheme: dark)").matches;
  let userTheme = isDark ? "dark" : "light";

  const toggleTheme = () => {
    userTheme === "dark" ? (userTheme = "light") : (userTheme = "dark");
  };

  return { userTheme, toggleTheme };
};

export { useToggleTheme };
