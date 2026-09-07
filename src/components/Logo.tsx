type LogoProps = {
  id: string;
  className?: string;
};

/**
 * Original, geometric emblems inspired by each school's identity + official colours.
 * Drawn as SVG so they stay crisp at any size and need no external assets.
 */
export default function Logo({ id, className = "h-8 w-8" }: LogoProps) {
  const common = {
    viewBox: "0 0 48 48",
    className,
    xmlns: "http://www.w3.org/2000/svg",
  };

  switch (id) {
    case "mit":
      // Stacked column bars motif
      return (
        <svg {...common}>
          <rect width="48" height="48" rx="10" fill="#0F1013" />
          <rect x="7" y="12" width="6" height="24" rx="1" fill="#A31F34" />
          <rect x="16" y="12" width="6" height="15" rx="1" fill="#A31F34" />
          <rect x="16" y="30" width="6" height="6" rx="1" fill="#8A8B8C" />
          <rect x="25" y="12" width="6" height="24" rx="1" fill="#A31F34" />
          <rect x="34" y="12" width="7" height="6" rx="1" fill="#8A8B8C" />
          <rect x="34" y="21" width="7" height="15" rx="1" fill="#A31F34" />
        </svg>
      );

    case "caltech":
      // Torch of knowledge
      return (
        <svg {...common}>
          <rect width="48" height="48" rx="10" fill="#0F1013" />
          <path
            d="M24 7c4.6 4.3 7.8 8.2 7.8 12.6 0 4.6-3.5 7.6-7.8 7.6s-7.8-3-7.8-7.6C16.2 15.2 19.4 11.3 24 7Z"
            fill="#FF6C0C"
          />
          <path d="M24 13.5c2.3 2.5 3.6 4.4 3.6 6.4a3.6 3.6 0 1 1-7.2 0c0-2 1.3-3.9 3.6-6.4Z" fill="#FFD5B0" />
          <rect x="21.6" y="27.5" width="4.8" height="10" rx="1.4" fill="#8A8B8C" />
          <rect x="14" y="37" width="20" height="4" rx="2" fill="#FF6C0C" />
        </svg>
      );

    case "stanford":
      // The tree
      return (
        <svg {...common}>
          <rect width="48" height="48" rx="10" fill="#0F1013" />
          <path
            d="M24 6c2.8 2.6 4.2 5.3 3.4 8 2.9 1 4.6 3.5 3.7 6.2 3 1.4 4 4.3 2.3 6.6 2.3 2.1 1.9 5.2-.9 6.6-1.9 1-4.3.8-6.6-.4v3.7h3.6a2 2 0 0 1 0 4h-11a2 2 0 0 1 0-4h3.4V33c-2.3 1.2-4.7 1.4-6.6.4-2.8-1.4-3.2-4.5-.9-6.6-1.7-2.3-.7-5.2 2.3-6.6-.9-2.7.8-5.2 3.7-6.2-.8-2.7.6-5.4 3.4-8Z"
            fill="#8C1515"
          />
          <path d="M23 20h2v14h-2z" fill="#175E54" opacity=".55" />
        </svg>
      );

    case "gatech":
      // GT monogram in a hex (yellow-jacket cell)
      return (
        <svg {...common}>
          <rect width="48" height="48" rx="10" fill="#003057" />
          <path d="M24 5.5 40 14.8v18.4L24 42.5 8 33.2V14.8L24 5.5Z" fill="#00223F" stroke="#B3A369" strokeWidth="2" />
          <text
            x="24"
            y="30.5"
            textAnchor="middle"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize="16"
            fontWeight="700"
            fill="#B3A369"
            letterSpacing="0.5"
          >
            GT
          </text>
        </svg>
      );

    case "cmu":
      // Tartan plaid
      return (
        <svg {...common}>
          <rect width="48" height="48" rx="10" fill="#6D6E71" />
          <rect x="0" y="6" width="48" height="7" fill="#C41230" />
          <rect x="0" y="27" width="48" height="10" fill="#C41230" opacity=".85" />
          <rect x="6" y="0" width="7" height="48" fill="#C41230" opacity=".7" />
          <rect x="27" y="0" width="10" height="48" fill="#C41230" opacity=".55" />
          <rect x="0" y="20" width="48" height="2.5" fill="#FDB515" />
          <rect x="20" y="0" width="2.5" height="48" fill="#FDB515" />
          <rect x="0" y="41" width="48" height="2" fill="#FDB515" opacity=".7" />
          <rect x="41" y="0" width="2" height="48" fill="#FDB515" opacity=".7" />
          <rect width="48" height="48" rx="10" fill="none" stroke="#0F1013" strokeWidth="2" />
        </svg>
      );

    case "purdue":
      // Blocky Boilermaker P
      return (
        <svg {...common}>
          <rect width="48" height="48" rx="10" fill="#0B0B0B" />
          <path d="M14 10h14.5c5.8 0 9.5 3.7 9.5 9.2s-3.9 9.4-9.9 9.4H22V38h-8V10Zm8 6.6v5.6h5c1.9 0 3-1 3-2.8s-1.1-2.8-3-2.8h-5Z" fill="#CEB888" />
          <rect x="14" y="40.5" width="24" height="2.5" rx="1.2" fill="#CEB888" opacity=".6" />
        </svg>
      );

    case "berkeley":
      // Cal shield + star
      return (
        <svg {...common}>
          <rect width="48" height="48" rx="10" fill="#003262" />
          <path d="M24 6.5c5 2.4 9.6 3.2 14 2.6v14.5c0 8.4-5.4 14.5-14 18.4-8.6-3.9-14-10-14-18.4V9.1c4.4.6 9-.2 14-2.6Z" fill="#00254A" stroke="#FDB515" strokeWidth="1.8" />
          <path d="m24 13.5 2.6 5.6 6 .8-4.4 4.3 1.1 6.1-5.3-2.9-5.3 2.9 1.1-6.1-4.4-4.3 6-.8L24 13.5Z" fill="#FDB515" />
        </svg>
      );

    case "tudelft":
      // Delft flame
      return (
        <svg {...common}>
          <rect width="48" height="48" rx="10" fill="#0C2340" />
          <path
            d="M27.5 5c.6 6-2.4 8.3-5.6 11.2-3.5 3.2-7.4 6.9-7.4 13.6C14.5 37.2 19 43 25.4 43c6.9 0 11.1-5 11.1-11.6 0-4.3-1.9-7.6-4.3-10.4.3 2.8-.6 5-2.2 6-.4-6.7-1.8-11.6-2.5-22Z"
            fill="#00A6D6"
          />
          <path
            d="M25.8 22c.4 4 2.9 6.1 2.9 9.6 0 2.7-1.5 4.6-3.6 4.6s-3.7-1.9-3.7-4.4c0-3.7 3.2-5.7 4.4-9.8Z"
            fill="#9BE3F7"
          />
        </svg>
      );

    case "uiuc":
      // Block I
      return (
        <svg {...common}>
          <rect width="48" height="48" rx="10" fill="#13294B" />
          <path d="M11 9h26v8h-9v14h9v8H11v-8h9V17h-9V9Z" fill="#FF5F05" />
        </svg>
      );

    case "princeton":
      // Tiger stripes + shield
      return (
        <svg {...common}>
          <rect width="48" height="48" rx="10" fill="#121212" />
          <path d="M24 6.5c4.6 2.2 9 3 13 2.5v14.4c0 8-5.1 13.9-13 17.6-7.9-3.7-13-9.6-13-17.6V9c4 .5 8.4-.3 13-2.5Z" fill="#E77500" />
          <g fill="#121212">
            <rect x="15.5" y="14" width="3" height="16" rx="1.5" />
            <rect x="22.5" y="11" width="3" height="21" rx="1.5" />
            <rect x="29.5" y="14" width="3" height="16" rx="1.5" />
          </g>
        </svg>
      );

    case "harvard":
      // Veritas shield with three books
      return (
        <svg {...common}>
          <rect width="48" height="48" rx="10" fill="#A51C30" />
          <path d="M24 7c4.2 2 8.2 2.7 12 2.3v13.9c0 7.6-4.8 13.2-12 16.8-7.2-3.6-12-9.2-12-16.8V9.3c3.8.4 7.8-.3 12-2.3Z" fill="#8A1526" stroke="#F2D5D9" strokeWidth="1.4" />
          <g fill="#F7EDEE">
            <rect x="15.5" y="14" width="7.5" height="5" rx="1" />
            <rect x="25" y="14" width="7.5" height="5" rx="1" />
            <rect x="20" y="22" width="8" height="5" rx="1" />
          </g>
        </svg>
      );

    case "cornell":
      // Big Red C
      return (
        <svg {...common}>
          <rect width="48" height="48" rx="10" fill="#B31B1B" />
          <path
            d="M33 16.5a11 11 0 1 0 0 15l4.5 4.6A17.4 17.4 0 1 1 37.5 12L33 16.5Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case "michigan":
      // Block M
      return (
        <svg {...common}>
          <rect width="48" height="48" rx="10" fill="#00274C" />
          <path d="M7 11h9.5l7.5 12 7.5-12H41v26h-8V24.5L26 35h-4l-7-10.5V37H7V11Z" fill="#FFCB05" />
        </svg>
      );

    case "harveymudd":
      // Toad-gold hex + HM
      return (
        <svg {...common}>
          <rect width="48" height="48" rx="10" fill="#111111" />
          <path d="M24 6 39 14.6v18.8L24 42 9 33.4V14.6L24 6Z" fill="none" stroke="#FFC72C" strokeWidth="2.2" />
          <text
            x="24"
            y="29.5"
            textAnchor="middle"
            fontFamily="Helvetica, Arial, sans-serif"
            fontSize="14"
            fontWeight="800"
            fill="#FFC72C"
          >
            HM
          </text>
        </svg>
      );

    case "ethz":
      // ETH bar-mark
      return (
        <svg {...common}>
          <rect width="48" height="48" rx="10" fill="#FFFFFF" />
          <rect x="6" y="15" width="36" height="5" rx="1" fill="#215CAF" />
          <rect x="6" y="23" width="26" height="5" rx="1" fill="#215CAF" />
          <rect x="6" y="31" width="16" height="5" rx="1" fill="#215CAF" />
          <rect x="35" y="23" width="7" height="13" rx="1" fill="#8B1A1A" />
        </svg>
      );

    case "cambridge":
      // Shield with cross + roses/lions abstracted
      return (
        <svg {...common}>
          <rect width="48" height="48" rx="10" fill="#0E3B32" />
          <path d="M24 7c4.4 2.1 8.6 2.8 12.6 2.4v13.9c0 7.8-5 13.5-12.6 17.2-7.6-3.7-12.6-9.4-12.6-17.2V9.4c4 .4 8.2-.3 12.6-2.4Z" fill="#A3C1AD" />
          <path d="M22 12h4v20h-4z" fill="#0E3B32" />
          <path d="M13 20h22v4H13z" fill="#0E3B32" />
          <circle cx="17" cy="16" r="1.7" fill="#0E3B32" />
          <circle cx="31" cy="16" r="1.7" fill="#0E3B32" />
        </svg>
      );

    case "imperial":
      // Imperial crown-ish geometric mark
      return (
        <svg {...common}>
          <rect width="48" height="48" rx="10" fill="#003E74" />
          <path d="M10 30 8 15l8 6 8-11 8 11 8-6-2 15H10Z" fill="#0091D4" />
          <rect x="10" y="32.5" width="28" height="5" rx="1.6" fill="#0091D4" />
        </svg>
      );

    case "waterloo":
      // Warriors shield / W
      return (
        <svg {...common}>
          <rect width="48" height="48" rx="10" fill="#111111" />
          <path d="M9 12h7.5l4 15 4.5-15h2l4.5 15 4-15H43l-7.5 25h-7L24 22.5 19.5 37h-7L9 12Z" fill="#FFD54F" />
        </svg>
      );

    case "illinoistech":
      // Mies-inspired steel grid + scarlet
      return (
        <svg {...common}>
          <rect width="48" height="48" rx="10" fill="#C8102E" />
          <g stroke="#FFFFFF" strokeWidth="2.2" opacity=".95">
            <path d="M12 10v28M24 10v28M36 10v28" />
            <path d="M9 19h30M9 29h30" />
          </g>
          <rect x="9" y="10" width="30" height="28" rx="1.5" fill="none" stroke="#FFFFFF" strokeWidth="2.6" />
        </svg>
      );

    case "rosehulman":
      // Rose window / compass rose
      return (
        <svg {...common}>
          <rect width="48" height="48" rx="10" fill="#A6192E" />
          <g fill="#FFFFFF">
            <path d="M24 9.5 27 21l11.5 3-11.5 3-3 11.5-3-11.5L9.5 24 21 21l3-11.5Z" />
          </g>
          <circle cx="24" cy="24" r="3.4" fill="#A6192E" />
          <circle cx="24" cy="24" r="14.5" fill="none" stroke="#FFFFFF" strokeWidth="1.4" opacity=".55" />
        </svg>
      );

    default:
      return (
        <svg {...common}>
          <rect width="48" height="48" rx="10" fill="#1B1D22" />
          <circle cx="24" cy="24" r="10" fill="#8B5CF6" />
        </svg>
      );
  }
}
