
import periPeriSauce from "@/assets/bbq-sauce.jpeg";
import creamyGarlicSauce from "@/assets/garlic-powder.580.jpeg";
import grilledWrap from "@/assets/bbq-steak-wrap.531.jpeg";
import bbqSkewer from "@/assets/chicken-skewers.jpeg";
import southAsian from "@/assets/biryani-classic.jpeg";
import mediterranean from "@/assets/chicken-seekh.jpeg";
import cleanProteins from "@/assets/sajji.jpeg";
import vibrantSides from "@/assets/SIDE-SALAD.jpg";
import { useNavigate } from "react-router-dom";


const signatureFlavors = [
  {
    title: "Peri Peri & Creamy Garlic Sauces",
    subtitle: "bold meets smooth",
    images: [periPeriSauce, creamyGarlicSauce],
  },
  {
    title: "Grilled Wraps & BBQ Skewers",
    subtitle: "fresh, fast and filling",
    images: [grilledWrap, bbqSkewer],
  },
  {
    title: "South Asian richness meets Mediterranean balance",
    subtitle: null,
    images: [southAsian, mediterranean],
  },
  {
    title: "Clean proteins & Vibrant sides",
    subtitle: "no shortcuts, no compromises",
    images: [cleanProteins, vibrantSides],
  },
];


export const OurSignatureFlavours = () => {
  const navigate = useNavigate();



  return (
    <section className="section-padding bg-background px-2 sm:px-0">
      <div className="container-luxury">
        <div className="gold-divider w-16 mb-6 mx-auto" />
        <h2 className="font-serif text-4xl md:text-5xl text-white mb-8 sm:mb-12 text-center tracking-tight">
          <span className="text-primary">Signature Flavors</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12">
          {signatureFlavors.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-transparent rounded-xl shadow-lg p-4 sm:p-6 gap-3 sm:gap-4 border-[0.5px] border-gold/30 hover:scale-[1.02] transition-transform w-full"
            >
              <div className="flex flex-col items-center w-full mb-1 sm:mb-2">
                <h3 className="font-serif text-lg md:text-xl text-foreground mb-0.5 sm:mb-1 font-semibold text-center break-words">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="text-sm md:text-base text-primary font-normal mb-1 sm:mb-2 text-center break-words">
                    {item.subtitle}
                  </p>
                )}
              </div>
              <div className="flex gap-2 sm:gap-4 flex-wrap justify-center w-full">
                {item.images.map((img, i) => (
                  <div key={i} className="story-glow-image w-28 h-20 sm:w-36 sm:h-24 md:w-48 md:h-32">
                    <img
                      src={img}
                      alt="Signature flavor visual"
                      className="w-full h-full object-cover rounded-lg gold-border shadow-md border-[0.5px] border-gold/30 bg-white/40 relative z-10"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
