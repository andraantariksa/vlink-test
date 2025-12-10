import { useAuth } from "@/app/lib/auth/AuthProvider";
import { getErrorMessage, State } from "@/app/utils/state";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../theme/colors";

export default function SignInScreen() {
  const { signInWithEmail } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState<State<unknown>>();

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            onChangeText={setEmail}
            value={email}
            style={styles.field}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            onChangeText={setPassword}
            value={password}
            style={styles.field}
            autoCapitalize="none"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            setResult({ type: "loading" });
            try {
              await signInWithEmail(email, password);
              setResult({ type: "success", data: null });
            } catch (error) {
              setResult({ type: "error", error });
            }
          }}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        {result?.type === "error" && (
          <Text>{getErrorMessage(result?.error)}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 12,
    width: "100%",
    padding: 32,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  field: {
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  fieldContainer: {},
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
  label: {
    paddingBottom: 4,
  },
});
