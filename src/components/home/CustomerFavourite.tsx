import React from "react";
import { usePublicCatalog } from "@/hooks/usePublicCatalog";

const CustomerFavourite = () => {
  const { menuItems } = usePublicCatalog();
  const favourites = menuItems.slice(0, 4);

  return (
  <section className="py-12">
    <div className="container mx-auto px-4 bg-transparent">
      <div className="gold-divider w-16 mb-6 mx-auto" />
      <h2 className="font-serif text-4xl md:text-5xl text-white mb-8 sm:mb-12 text-center tracking-tight">
        Customer <span className="text-primary">Favourite</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {favourites.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
            <div className="story-glow-image w-24 h-24 mb-3">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-full relative z-10" />
            </div>
            <h3 className="text-lg font-semibold mb-1 text-yellow-800">{item.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
            {/* <span className="font-bold text-yellow-700">${item.price} CAD</span> */}
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default CustomerFavourite;
