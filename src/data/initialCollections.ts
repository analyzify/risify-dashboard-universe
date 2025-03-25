
import { TreeItem } from "react-sortable-tree";

// Define the initial tree data with comprehensive mock collections
export const initialCollections: TreeItem[] = [
  {
    title: "Women",
    expanded: true,
    children: [
      { 
        title: "Dresses", 
        expanded: true,
        children: [
          { title: "Cocktail Dresses", children: [] },
          { title: "Maxi Dresses", children: [] },
          { title: "Summer Dresses", children: [] },
          { title: "Evening Gowns", children: [] }
        ] 
      },
      { 
        title: "Tops", 
        expanded: true,
        children: [
          { title: "Blouses", children: [] },
          { title: "T-Shirts", children: [] },
          { title: "Sweaters", children: [] }
        ] 
      },
      { 
        title: "Bottoms", 
        expanded: true,
        children: [
          { title: "Jeans", children: [] },
          { title: "Skirts", children: [] },
          { title: "Shorts", children: [] }
        ] 
      },
      { 
        title: "Outerwear",
        expanded: true, 
        children: [
          { title: "Winter Jackets", children: [] },
          { title: "Rain Coats", children: [] },
          { title: "Spring Jackets", children: [] }
        ] 
      }
    ]
  },
  {
    title: "Men",
    expanded: true,
    children: [
      { 
        title: "Shirts", 
        expanded: true,
        children: [
          { title: "Dress Shirts", children: [] },
          { title: "Casual Shirts", children: [] },
          { title: "Polo Shirts", children: [] }
        ] 
      },
      { 
        title: "Pants", 
        expanded: true,
        children: [
          { title: "Chinos", children: [] },
          { title: "Jeans", children: [] },
          { title: "Dress Pants", children: [] }
        ] 
      },
      { 
        title: "Suits", 
        expanded: true,
        children: [
          { title: "Business Suits", children: [] },
          { title: "Tuxedos", children: [] },
          { title: "Casual Blazers", children: [] }
        ] 
      },
      { 
        title: "Outerwear", 
        expanded: true,
        children: [
          { title: "Winter Coats", children: [] },
          { title: "Leather Jackets", children: [] },
          { title: "Rainwear", children: [] }
        ] 
      }
    ]
  },
  {
    title: "Accessories",
    expanded: true,
    children: [
      { 
        title: "Jewelry", 
        expanded: true,
        children: [
          { title: "Necklaces", children: [] },
          { title: "Bracelets", children: [] },
          { title: "Earrings", children: [] },
          { title: "Rings", children: [] }
        ] 
      },
      { 
        title: "Hats", 
        expanded: true,
        children: [
          { title: "Summer Hats", children: [] },
          { title: "Winter Hats", children: [] },
          { title: "Caps", children: [] }
        ] 
      },
      { 
        title: "Bags", 
        expanded: true,
        children: [
          { title: "Handbags", children: [] },
          { title: "Backpacks", children: [] },
          { title: "Clutches", children: [] },
          { title: "Totes", children: [] }
        ] 
      },
      { 
        title: "Shoes", 
        expanded: true,
        children: [
          { 
            title: "Women's Shoes", 
            expanded: true,
            children: [
              { title: "Heels", children: [] },
              { title: "Flats", children: [] },
              { title: "Boots", children: [] }
            ] 
          },
          { 
            title: "Men's Shoes", 
            expanded: true,
            children: [
              { title: "Dress Shoes", children: [] },
              { title: "Sneakers", children: [] },
              { title: "Boots", children: [] }
            ] 
          }
        ] 
      }
    ]
  },
  {
    title: "Home",
    expanded: true,
    children: [
      { 
        title: "Living Room",
        expanded: true, 
        children: [
          { title: "Sofas", children: [] },
          { title: "Coffee Tables", children: [] },
          { title: "Throw Pillows", children: [] },
          { title: "Lighting", children: [] }
        ] 
      },
      { 
        title: "Bedroom", 
        expanded: true,
        children: [
          { title: "Bedding", children: [] },
          { title: "Mattresses", children: [] },
          { title: "Nightstands", children: [] }
        ] 
      },
      { 
        title: "Kitchen", 
        expanded: true,
        children: [
          { title: "Cookware", children: [] },
          { title: "Appliances", children: [] },
          { title: "Tableware", children: [] },
          { 
            title: "Storage", 
            expanded: true,
            children: [
              { title: "Pantry Organizers", children: [] },
              { title: "Spice Racks", children: [] },
              { title: "Food Containers", children: [] }
            ] 
          }
        ] 
      }
    ]
  },
  {
    title: "Sale",
    expanded: true,
    children: [
      { title: "Clearance", children: [] },
      { title: "Seasonal Markdowns", children: [] },
      { title: "Flash Sales", children: [] }
    ]
  }
];
