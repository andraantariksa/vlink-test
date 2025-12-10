import Button from "@/app/components/Button";
import { useAuth } from "@/app/lib/auth/AuthProvider";
import { getErrorMessage, State } from "@/app/utils/state";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../theme/colors";

export default function SignInScreen() {
  const { signInWithEmail } = useAuth();
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState<State<unknown>>();

  return (
    <View style={[{ paddingBottom: insets.bottom }, styles.container]}>
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
        <Button
          onPress={async () => {
            setResult({ type: "loading" });
            try {
              await signInWithEmail(email, password);
              setResult({ type: "success", data: null });
            } catch (error) {
              setResult({ type: "error", error });
            }
          }}
          text="Sign In"
        />
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
  label: {
    paddingBottom: 4,
  },
});
