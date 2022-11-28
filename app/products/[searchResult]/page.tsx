type SearchItemProps = {
  params: {
    searchResult: string;
  };
};

const SearchResult = async ({ params: { searchResult } }: SearchItemProps) => {
  return (
    <div>
      <p>You searched for {searchResult}</p>
    </div>
  );
};

export default SearchResult;
