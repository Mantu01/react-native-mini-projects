import { MoonStarIcon, SunIcon } from "lucide-react-native";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import { useColorScheme } from "nativewind";

function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Button
      onPressIn={toggleColorScheme}
      size="icon"
      variant="ghost"
      className="rounded-full mr-4">
      <Icon as={colorScheme === 'dark' ? SunIcon : MoonStarIcon} className="size-5" />
    </Button>
  );
}

export default ThemeToggle;