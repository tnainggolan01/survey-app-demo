export const metadata = {
  title: {
    template: "%s | Questionnaires",
    default: "Questionnaire Form",
  },
};

export default function ResponseLayout({ children }) {
  return <div>{children}</div>;
}
