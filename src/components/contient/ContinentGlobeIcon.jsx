import { FcGlobe } from "react-icons/fc";
import {
  GiAfrica,
  GiAntarctica,
  GiEarthAsiaOceania,
  GiSouthAmerica,
} from "react-icons/gi";

export default function ContinentGlobeIcon({ code, size, style }) {
  let Icon = FcGlobe;

  switch (code) {
    case "AF":
      Icon = GiAfrica;
    case "AN":
      Icon = GiAntarctica;
    case "OC":
      Icon = GiEarthAsiaOceania;
    case "SA":
      Icon = GiSouthAmerica;
  }

  return <Icon size={size} style={style} />;
}
