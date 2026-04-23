import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card";
import type { MenuItem } from "../lib/menu-types";

interface MenuCardProps {
  item: MenuItem;
  setModalStack: React.Dispatch<React.SetStateAction<any[]>>;
}

const MenuCard: React.FC<MenuCardProps> = ({ item, setModalStack }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setModalStack([item])}>
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          {item.name}
          {item.isNew && <span className="ml-2 px-2 py-0.5 bg-green-200 text-green-800 rounded text-xs">New</span>}
          {item.isPopular && <span className="ml-2 px-2 py-0.5 bg-yellow-200 text-yellow-800 rounded text-xs">Popular</span>}
        </CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center">
          <img
            src={item.image || "/assets/placeholder.svg"}
            alt={item.name}
            className="w-32 h-32 object-contain mb-2 rounded"
            onError={e => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/assets/placeholder.svg";
            }}
          />
          {typeof item.price === "number" && (
            <div className="text-primary font-semibold text-lg mt-2">£{item.price.toFixed(2)}</div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        {item.dietary?.map(flag => (
          <span key={flag} className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">{flag}</span>
        ))}
        {item.allergens?.length ? (
          <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded text-xs">Allergens</span>
        ) : null}
      </CardFooter>
    </Card>
  );
};

export default MenuCard;
