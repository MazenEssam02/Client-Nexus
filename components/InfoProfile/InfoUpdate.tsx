import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { font } from "../../constants/Font";
import { Colors } from "../../constants/Color";
import InfoInput from "./InfoInput";
import OurButton from "../../UI/OurButton";
import { Controller, useForm } from "react-hook-form";
import useProfileStore from "../../store/Profile";

const InfoUpdate = ({ onCancel, save }) => {
  const profileData = useProfileStore((state) => state.profileData);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: Object.fromEntries(
      Object.entries(profileData).map(([key, valueObj]) => [
        key,
        valueObj.value,
      ])
    ),
  });

  const onSubmit = (data) => {
    save(data);
  };

  return (
    <View style={styles.mainContainer}>
      {Object.keys(profileData).map((key) => {
        return (
          <View key={key} style={styles.container}>
            <Text style={styles.title}>{profileData[key].header}</Text>
            <Controller
              control={control}
              name={key}
              rules={{
                required:
                  key !== "password" && profileData[key].header
                    ? `${profileData[key].header} يجب ادخال`
                    : undefined,
              }}
              render={({ field }) => <InfoInput field={key} form={field} />}
            />
            {errors[key] && (
              <Text style={styles.error}>{errors[key].message}</Text>
            )}
          </View>
        );
      })}

      <View style={styles.ButtonContainer}>
        <OurButton onPress={handleSubmit(onSubmit)} style={styles.button}>
          حفظ التغييرات
        </OurButton>
        <OurButton onPress={onCancel} style={styles.button}>
          إلغاء
        </OurButton>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 5,
  },
  container: {
    marginVertical: 7,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  title: {
    fontFamily: font.subtitle.fontFamily,
    fontSize: font.subtitle.fontSize,
    borderBottomWidth: 1,
    borderBottomColor: Colors.SecondaryColor,
    color: Colors.SecondaryColor,
  },
  error: {
    color: Colors.invalidColor600,
    fontFamily: font.subtitle.fontFamily,
    fontSize: font.subtitle.fontSize,
    textAlign: "right",
    marginTop: 2,
  },
  ButtonContainer: {
    flexDirection: "row-reverse",
    columnGap: 30,
    justifyContent: "center",
    alignSelf: "center",
  },
  button: {
    padding: 8,
    marginTop: 10,
  },
});
export default InfoUpdate;
