<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
  <defs>
    <!-- Gradient for left stem -->
    <linearGradient id="favStemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#029E9A"/>
      <stop offset="100%" stop-color="#006D80"/>
    </linearGradient>

    <!-- Gradient for swoop arrow -->
    <linearGradient id="favArrowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#02305C"/>
      <stop offset="50%" stop-color="#008E9B"/>
      <stop offset="100%" stop-color="#00BF9A"/>
    </linearGradient>
  </defs>

  <!-- Dark navy container background -->
  <rect width="64" height="64" rx="14" fill="#05142B"/>

  <!-- Left vertical pillar -->
  <path d="M 12 16
           C 12 14 14 12 16 12
           L 22 12
           C 23 12 24 13 24 14
           L 24 23
           C 18 30 17 38 17 45
           L 15 45
           C 13 45 12 44 12 42
           Z"
        fill="url(#favStemGrad)"/>

  <!-- Upper diagonal arm of K -->
  <polygon points="26,26 42,12 49,12 26,32" fill="#0A2240"/>

  <!-- Ascending growth bars -->
  <rect x="27" y="36" width="4.5" height="9" rx="1" fill="#04325C"/>
  <rect x="33.5" y="31" width="4.5" height="14" rx="1" fill="#00A09A"/>
  <rect x="40" y="24" width="5" height="21" rx="1" fill="#00BF9A"/>

  <!-- Swoop curve -->
  <path d="M 12 44
           C 18 52 28 53 37 49
           C 44 46 50 38 54 30
           C 51 36 45 44 37 46
           C 28 48 20 47 14 42
           Z"
        fill="url(#favArrowGrad)"/>

  <!-- Arrowhead -->
  <polygon points="55,23 60,34 54,32 50,36" fill="#00D2B0"/>
</svg>
      
