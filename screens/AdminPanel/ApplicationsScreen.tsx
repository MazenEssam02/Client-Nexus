import React, { useLayoutEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import { useQuery } from "@tanstack/react-query";
import { ServiceProvider } from "../../API/https";
import { ApplicationRequest } from "../../components/Application/ApplicationRequest";
type Application = {
  id: number;
  firstName: string;
  lastName: string;
  birthdate: string;
  description: string;
  gender: 70 | 77;
  imageIDUrl: string | null;
  addresses: [
    {
      detailedAddress: string;
      cityId: number;
      stateId: number;
      cityName: string;
      stateName: string;
    }
  ];
  rate: number;
  mainImage: string | null;
  imageNationalIDUrl: string | null;
  yearsOfExperience: number;
  specializationName: string[];
  office_consultation_price: number;
  telephone_consultation_price: number;
  main_Specialization: string;
  isApproved: boolean;
  isFeatured: boolean;
  subscriptionStatus: number;
  subType: number;
  subscriptionExpiryDate: null;
};
const ApplicationsScreen = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const {
    data: Applications,
    isLoading: isGetLoading,
    isError: isGetError,
    error: getError,
  } = useQuery({
    queryKey: ["Applications"],
    queryFn: ServiceProvider.getApplications,
  });
  useLayoutEffect(() => {
    if (Applications?.data) {
      console.log(Applications.data.data);
      Applications.data.data.map((Application: Application) => {
        const newApplication: Application = {
          // id: Application.id,
          // addresses: Application.addresses,
          // birthdate: Application.birthdate,
          // description: Application.description,
          // firstName: Application.firstName,
          // gender: Application.gender,
          // imageIDUrl: Application.imageIDUrl,
          // imageNationalIDUrl: Application.imageNationalIDUrl,
          // isApproved: Application.isApproved,
          // isFeatured: Application.isFeatured,
          // lastName: Application.lastName,
          // main_Specialization: Application.main_Specialization,
          // mainImage: Application.mainImage,
          // office_consultation_price: Application.office_consultation_price,
          // rate: Application.rate,
          // specializationName: Application.specializationName,
          // subscriptionExpiryDate: Application.subscriptionExpiryDate,
          // subscriptionStatus: Application.subscriptionStatus,
          // subType: Application.subType,
          // telephone_consultation_price: Application.
          ...Application,
        };
        setApplications((prev) => [...prev, newApplication]);
      });
    }
  }, [setApplications, Applications]);
  const requests = [
    { id: "1", name: "عبدالكريم محمود" },
    { id: "2", name: "عبدالكريم محمود" },
    { id: "3", name: "عبدالكريم محمود" },
  ];
  console.log(applications);

  return (
    <View style={styles.container}>
      <FlatList
        data={applications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ApplicationRequest item={item} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default ApplicationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 10,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: Colors.mainColor,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
  },
  name: {
    fontSize: font.headline.fontSize,
    color: "#FFF",
    fontFamily: font.headline.fontFamily,
  },
});
