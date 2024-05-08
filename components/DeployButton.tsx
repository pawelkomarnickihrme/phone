import loadData from "../utils/import";

export default function DeployButton() {
  return (
    <form action={loadData}>
      <button
        type="submit"
        className="py-2 px-3 flex rounded-md no-underline hover:bg-btn-background-hover border"
      >
        Import data
      </button>
    </form>
  );
}
