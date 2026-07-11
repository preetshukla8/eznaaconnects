import { useState } from "react";

// The picker is data-driven so new countries can be added without changing consumers.
export const COUNTRY_CODES = [
  { code: "+1", label: "Canada / United States", flag: "🇨🇦" },
  { code: "+7", label: "Russia / Kazakhstan", flag: "🇷🇺" },
  { code: "+20", label: "Egypt", flag: "🇪🇬" },
  { code: "+27", label: "South Africa", flag: "🇿🇦" },
  { code: "+30", label: "Greece", flag: "🇬🇷" },
  { code: "+31", label: "Netherlands", flag: "🇳🇱" },
  { code: "+32", label: "Belgium", flag: "🇧🇪" },
  { code: "+33", label: "France", flag: "🇫🇷" },
  { code: "+34", label: "Spain", flag: "🇪🇸" },
  { code: "+36", label: "Hungary", flag: "🇭🇺" },
  { code: "+39", label: "Italy", flag: "🇮🇹" },
  { code: "+40", label: "Romania", flag: "🇷🇴" },
  { code: "+41", label: "Switzerland", flag: "🇨🇭" },
  { code: "+43", label: "Austria", flag: "🇦🇹" },
  { code: "+44", label: "United Kingdom", flag: "🇬🇧" },
  { code: "+45", label: "Denmark", flag: "🇩🇰" },
  { code: "+46", label: "Sweden", flag: "🇸🇪" },
  { code: "+47", label: "Norway", flag: "🇳🇴" },
  { code: "+48", label: "Poland", flag: "🇵🇱" },
  { code: "+49", label: "Germany", flag: "🇩🇪" },
  { code: "+51", label: "Peru", flag: "🇵🇪" },
  { code: "+52", label: "Mexico", flag: "🇲🇽" },
  { code: "+53", label: "Cuba", flag: "🇨🇺" },
  { code: "+54", label: "Argentina", flag: "🇦🇷" },
  { code: "+55", label: "Brazil", flag: "🇧🇷" },
  { code: "+56", label: "Chile", flag: "🇨🇱" },
  { code: "+57", label: "Colombia", flag: "🇨🇴" },
  { code: "+58", label: "Venezuela", flag: "🇻🇪" },
  { code: "+60", label: "Malaysia", flag: "🇲🇾" },
  { code: "+61", label: "Australia", flag: "🇦🇺" },
  { code: "+62", label: "Indonesia", flag: "🇮🇩" },
  { code: "+63", label: "Philippines", flag: "🇵🇭" },
  { code: "+64", label: "New Zealand", flag: "🇳🇿" },
  { code: "+65", label: "Singapore", flag: "🇸🇬" },
  { code: "+66", label: "Thailand", flag: "🇹🇭" },
  { code: "+81", label: "Japan", flag: "🇯🇵" },
  { code: "+82", label: "South Korea", flag: "🇰🇷" },
  { code: "+84", label: "Vietnam", flag: "🇻🇳" },
  { code: "+86", label: "China", flag: "🇨🇳" },
  { code: "+90", label: "Turkey", flag: "🇹🇷" },
  { code: "+91", label: "India", flag: "🇮🇳" },
  { code: "+92", label: "Pakistan", flag: "🇵🇰" },
  { code: "+93", label: "Afghanistan", flag: "🇦🇫" },
  { code: "+94", label: "Sri Lanka", flag: "🇱🇰" },
  { code: "+95", label: "Myanmar", flag: "🇲🇲" },
  { code: "+960", label: "Maldives", flag: "🇲🇻" },
  { code: "+961", label: "Lebanon", flag: "🇱🇧" },
  { code: "+962", label: "Jordan", flag: "🇯🇴" },
  { code: "+963", label: "Syria", flag: "🇸🇾" },
  { code: "+964", label: "Iraq", flag: "🇮🇶" },
  { code: "+965", label: "Kuwait", flag: "🇰🇼" },
  { code: "+966", label: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+967", label: "Yemen", flag: "🇾🇪" },
  { code: "+968", label: "Oman", flag: "🇴🇲" },
  { code: "+970", label: "Palestine", flag: "🇵🇸" },
  { code: "+971", label: "UAE", flag: "🇦🇪" },
  { code: "+972", label: "Israel", flag: "🇮🇱" },
  { code: "+973", label: "Bahrain", flag: "🇧🇭" },
  { code: "+974", label: "Qatar", flag: "🇶🇦" },
  { code: "+975", label: "Bhutan", flag: "🇧🇹" },
  { code: "+976", label: "Mongolia", flag: "🇲🇳" },
  { code: "+977", label: "Nepal", flag: "🇳🇵" },
  { code: "+992", label: "Tajikistan", flag: "🇹🇯" },
  { code: "+993", label: "Turkmenistan", flag: "🇹🇲" },
  { code: "+994", label: "Azerbaijan", flag: "🇦🇿" },
  { code: "+995", label: "Georgia", flag: "🇬🇪" },
  { code: "+996", label: "Kyrgyzstan", flag: "🇰🇬" },
  { code: "+998", label: "Uzbekistan", flag: "🇺🇿" },
  { code: "+213", label: "Algeria", flag: "🇩🇿" },
  { code: "+216", label: "Tunisia", flag: "🇹🇳" },
  { code: "+218", label: "Libya", flag: "🇱🇾" },
  { code: "+220", label: "Gambia", flag: "🇬🇲" },
  { code: "+221", label: "Senegal", flag: "🇸🇳" },
  { code: "+222", label: "Mauritania", flag: "🇲🇷" },
  { code: "+223", label: "Mali", flag: "🇲🇱" },
  { code: "+224", label: "Guinea", flag: "🇬🇳" },
  { code: "+225", label: "Ivory Coast", flag: "🇨🇮" },
  { code: "+226", label: "Burkina Faso", flag: "🇧🇫" },
  { code: "+227", label: "Niger", flag: "🇳🇪" },
  { code: "+228", label: "Togo", flag: "🇹🇬" },
  { code: "+229", label: "Benin", flag: "🇧🇯" },
  { code: "+230", label: "Mauritius", flag: "🇲🇺" },
  { code: "+231", label: "Liberia", flag: "🇱🇷" },
  { code: "+232", label: "Sierra Leone", flag: "🇸🇱" },
  { code: "+233", label: "Ghana", flag: "🇬🇭" },
  { code: "+234", label: "Nigeria", flag: "🇳🇬" },
  { code: "+235", label: "Chad", flag: "🇹🇩" },
  { code: "+236", label: "Central African Republic", flag: "🇨🇫" },
  { code: "+237", label: "Cameroon", flag: "🇨🇲" },
  { code: "+238", label: "Cape Verde", flag: "🇨🇻" },
  { code: "+239", label: "São Tomé and Príncipe", flag: "🇸🇹" },
  { code: "+240", label: "Equatorial Guinea", flag: "🇬🇶" },
  { code: "+241", label: "Gabon", flag: "🇬🇦" },
  { code: "+242", label: "Republic of the Congo", flag: "🇨🇬" },
  { code: "+243", label: "DR Congo", flag: "🇨🇩" },
  { code: "+244", label: "Angola", flag: "🇦🇴" },
  { code: "+245", label: "Guinea-Bissau", flag: "🇬🇼" },
  { code: "+248", label: "Seychelles", flag: "🇸🇨" },
  { code: "+249", label: "Sudan", flag: "🇸🇩" },
  { code: "+250", label: "Rwanda", flag: "🇷🇼" },
  { code: "+251", label: "Ethiopia", flag: "🇪🇹" },
  { code: "+252", label: "Somalia", flag: "🇸🇴" },
  { code: "+253", label: "Djibouti", flag: "🇩🇯" },
  { code: "+254", label: "Kenya", flag: "🇰🇪" },
  { code: "+255", label: "Tanzania", flag: "🇹🇿" },
  { code: "+256", label: "Uganda", flag: "🇺🇬" },
  { code: "+257", label: "Burundi", flag: "🇧🇮" },
  { code: "+258", label: "Mozambique", flag: "🇲🇿" },
  { code: "+260", label: "Zambia", flag: "🇿🇲" },
  { code: "+261", label: "Madagascar", flag: "🇲🇬" },
  { code: "+262", label: "Reunion", flag: "🇷🇪" },
  { code: "+263", label: "Zimbabwe", flag: "🇿🇼" },
  { code: "+264", label: "Namibia", flag: "🇳🇦" },
  { code: "+265", label: "Malawi", flag: "🇲🇼" },
  { code: "+266", label: "Lesotho", flag: "🇱🇸" },
  { code: "+267", label: "Botswana", flag: "🇧🇼" },
  { code: "+268", label: "Eswatini", flag: "🇸🇿" },
  { code: "+290", label: "Saint Helena", flag: "🇸🇭" },
  { code: "+291", label: "Eritrea", flag: "🇪🇷" },
  { code: "+297", label: "Aruba", flag: "🇦🇼" },
  { code: "+298", label: "Faroe Islands", flag: "🇫🇴" },
  { code: "+299", label: "Greenland", flag: "🇬🇱" },
  { code: "+350", label: "Gibraltar", flag: "🇬🇮" },
  { code: "+351", label: "Portugal", flag: "🇵🇹" },
  { code: "+352", label: "Luxembourg", flag: "🇱🇺" },
  { code: "+353", label: "Ireland", flag: "🇮🇪" },
  { code: "+354", label: "Iceland", flag: "🇮🇸" },
  { code: "+355", label: "Albania", flag: "🇦🇱" },
  { code: "+356", label: "Malta", flag: "🇲🇹" },
  { code: "+357", label: "Cyprus", flag: "🇨🇾" },
  { code: "+358", label: "Finland", flag: "🇫🇮" },
  { code: "+359", label: "Bulgaria", flag: "🇧🇬" },
  { code: "+370", label: "Lithuania", flag: "🇱🇹" },
  { code: "+371", label: "Latvia", flag: "🇱🇻" },
  { code: "+372", label: "Estonia", flag: "🇪🇪" },
  { code: "+373", label: "Moldova", flag: "🇲🇩" },
  { code: "+374", label: "Armenia", flag: "🇦🇲" },
  { code: "+375", label: "Belarus", flag: "🇧🇾" },
  { code: "+376", label: "Andorra", flag: "🇦🇩" },
  { code: "+377", label: "Monaco", flag: "🇲🇨" },
  { code: "+378", label: "San Marino", flag: "🇸🇲" },
  { code: "+380", label: "Ukraine", flag: "🇺🇦" },
  { code: "+381", label: "Serbia", flag: "🇷🇸" },
  { code: "+382", label: "Montenegro", flag: "🇲🇪" },
  { code: "+385", label: "Croatia", flag: "🇭🇷" },
  { code: "+386", label: "Slovenia", flag: "🇸🇮" },
  { code: "+387", label: "Bosnia and Herzegovina", flag: "🇧🇦" },
  { code: "+389", label: "North Macedonia", flag: "🇲🇰" },
  { code: "+420", label: "Czech Republic", flag: "🇨🇿" },
  { code: "+421", label: "Slovakia", flag: "🇸🇰" },
  { code: "+423", label: "Liechtenstein", flag: "🇱🇮" },
  { code: "+500", label: "Falkland Islands", flag: "🇫🇰" },
  { code: "+501", label: "Belize", flag: "🇧🇿" },
  { code: "+502", label: "Guatemala", flag: "🇬🇹" },
  { code: "+503", label: "El Salvador", flag: "🇸🇻" },
  { code: "+504", label: "Honduras", flag: "🇭🇳" },
  { code: "+505", label: "Nicaragua", flag: "🇳🇮" },
  { code: "+506", label: "Costa Rica", flag: "🇨🇷" },
  { code: "+507", label: "Panama", flag: "🇵🇦" },
  { code: "+508", label: "Saint Pierre and Miquelon", flag: "🇵🇲" },
  { code: "+509", label: "Haiti", flag: "🇭🇹" },
  { code: "+590", label: "Guadeloupe", flag: "🇬🇵" },
  { code: "+591", label: "Bolivia", flag: "🇧🇴" },
  { code: "+592", label: "Guyana", flag: "🇬🇾" },
  { code: "+593", label: "Ecuador", flag: "🇪🇨" },
  { code: "+594", label: "French Guiana", flag: "🇬🇫" },
  { code: "+595", label: "Paraguay", flag: "🇵🇾" },
  { code: "+596", label: "Martinique", flag: "🇲🇶" },
  { code: "+597", label: "Suriname", flag: "🇸🇷" },
  { code: "+598", label: "Uruguay", flag: "🇺🇾" },
  { code: "+599", label: "Caribbean Netherlands", flag: "🇧🇶" },
  { code: "+670", label: "Timor-Leste", flag: "🇹🇱" },
  { code: "+673", label: "Brunei", flag: "🇧🇳" },
  { code: "+674", label: "Nauru", flag: "🇳🇷" },
  { code: "+675", label: "Papua New Guinea", flag: "🇵🇬" },
  { code: "+676", label: "Tonga", flag: "🇹🇴" },
  { code: "+677", label: "Solomon Islands", flag: "🇸🇧" },
  { code: "+678", label: "Vanuatu", flag: "🇻🇺" },
  { code: "+679", label: "Fiji", flag: "🇫🇯" },
  { code: "+680", label: "Palau", flag: "🇵🇼" },
  { code: "+682", label: "Cook Islands", flag: "🇨🇰" },
  { code: "+683", label: "Niue", flag: "🇳🇺" },
  { code: "+685", label: "Samoa", flag: "🇼🇸" },
  { code: "+686", label: "Kiribati", flag: "🇰🇮" },
  { code: "+687", label: "New Caledonia", flag: "🇳🇨" },
  { code: "+688", label: "Tuvalu", flag: "🇹🇻" },
  { code: "+689", label: "French Polynesia", flag: "🇵🇫" },
  { code: "+690", label: "Tokelau", flag: "🇹🇰" },
  { code: "+691", label: "Micronesia", flag: "🇫🇲" },
  { code: "+692", label: "Marshall Islands", flag: "🇲🇭" },
  { code: "+850", label: "North Korea", flag: "🇰🇵" },
  { code: "+852", label: "Hong Kong", flag: "🇭🇰" },
  { code: "+853", label: "Macau", flag: "🇲🇴" },
  { code: "+855", label: "Cambodia", flag: "🇰🇭" },
  { code: "+856", label: "Laos", flag: "🇱🇦" },
  { code: "+880", label: "Bangladesh", flag: "🇧🇩" },
] as const;

type Props = {
  name: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  defaultDial?: string;
};

function parseDefault(v: string | undefined) {
  if (!v) return { dial: "+971", num: "" };
  const trimmed = v.trim();
  const match = COUNTRY_CODES.find((c) => trimmed.startsWith(c.code));
  if (match) return { dial: match.code, num: trimmed.slice(match.code.length).trim() };
  return { dial: "+971", num: trimmed.replace(/^\+/, "") };
}

/**
 * Phone number input with a country dial-code selector.
 * Submits a single `name` field combining "<dial> <number>" via a hidden input,
 * so existing FormData consumers keep working unchanged.
 */
export function PhoneInput({ name, required, placeholder, defaultValue, defaultDial }: Props) {
  const parsed = parseDefault(defaultValue);
  const [dial, setDial] = useState(defaultDial ?? parsed.dial);
  const [num, setNum] = useState(parsed.num);
  const combined = num.trim() ? `${dial} ${num.trim()}` : "";

  return (
    <div className="flex gap-2">
      <select
        aria-label="Country dial code"
        value={dial}
        onChange={(e) => setDial(e.target.value)}
        className="h-11 shrink-0 rounded-md border border-input bg-card px-2 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/30"
      >
        {COUNTRY_CODES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.flag} {c.code}
          </option>
        ))}
      </select>
      <input
        type="tel"
        inputMode="tel"
        value={num}
        onChange={(e) => setNum(e.target.value)}
        required={required}
        placeholder={placeholder ?? "55 236 5373"}
        className="h-11 flex-1 rounded-md border border-input bg-card px-3.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/30"
      />
      <input type="hidden" name={name} value={combined} />
    </div>
  );
}
