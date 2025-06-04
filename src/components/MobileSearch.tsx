//=============== HOOKS ===============//
import React, { useCallback, useEffect, useState } from "react";

//=============== NEXT ROUTER ===============//
import { useRouter } from "next/navigation";

//=============== ICONS ===============//
import { CiSearch } from "react-icons/ci";

//=============== MobileSearchProps TYPE ===============//
type MobileSearchProps = {
  setMobileSearchOpen: (value: boolean) => void;
};

const MobileSearch = ({ setMobileSearchOpen }: MobileSearchProps) => {
  //=============== USERQUERY TO SEARCH PRODUCTS ===============//
  const [userSearchQuery, setUserSearchQuery] = useState<string>("");

  //=============== NEXT ROUTER ===============//
  const nextRouter = useRouter();

  //========= Close the mobile navbar on scroll to enhancing the UX =========//
  const closeSearchOnScroll = useCallback(() => {
    setMobileSearchOpen(false);
  }, [setMobileSearchOpen]);

  useEffect(() => {
    window.addEventListener("scroll", closeSearchOnScroll);
    return () => window.removeEventListener("scroll", closeSearchOnScroll);
  }, [closeSearchOnScroll]);

  //========= Taking the userQuery and pushing it to the URL =========//
  const handleUserSearch = (): void => {
    // We trim and lowercase the user input to make the search more consistent.
    const userQuery = userSearchQuery.trim().toLocaleLowerCase();

    // If the search input is empty, we stop here.
    if (!userQuery) return;

    // We close the mobile search, clear the input, and navigate to the search results page.
    setMobileSearchOpen(false);
    setUserSearchQuery("");
    nextRouter.push(`/search?q=${encodeURIComponent(userQuery)}`);
  };

  return (
    <div className="flex items-center top-20 pr-1.5 md:hidden bg-neutral-100 border border-neutral-400 rounded-lg">
      <input
        type="text"
        placeholder="Search..."
        name="mobile-searchbar"
        value={userSearchQuery}
        onKeyDown={(e) => e.key === "Enter" && handleUserSearch()}
        onChange={(e) => setUserSearchQuery(e.target.value)}
        className="py-3 px-2 flex-1 text-lg"
      />
      <CiSearch
        className="bg-neutral-950 text-3xl text-neutral-100 rounded-full p-1.5 size-10 cursor-pointer transition duration-200 hover:scale-105"
        onClick={handleUserSearch}
        aria-label="Search..."
      />
    </div>
  );
};

export default MobileSearch;
