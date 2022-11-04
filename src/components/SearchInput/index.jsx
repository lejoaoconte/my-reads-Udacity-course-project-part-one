import "./SearchInput.styles.scss";

export function SearchInput() {
  return (
    <div className="container-search">
      <label className="label-search" htmlFor="search">
        Search
      </label>
      <input
        placeholder=" "
        required
        className="input-search"
        type="text"
        name="search"
        id="search"
      />
    </div>
  );
}
