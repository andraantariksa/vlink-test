import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { colors } from "../theme/colors";

export type ButtonProps = Omit<TouchableOpacityProps, "children"> & {
  text: string;
};

export default function Button({ style, text, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} {...rest}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});
