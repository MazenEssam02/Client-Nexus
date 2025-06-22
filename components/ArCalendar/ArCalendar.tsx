import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";

// Eastern Arabic Numeral Formatter
const easternArabicNumeralFormatter = new Intl.NumberFormat("ar-u-nu-arab", {
  useGrouping: false,
});

// Custom Day Component
const ArCustomDay = (props) => {
  const { date, state, marking, theme, onPress, onLongPress } = props;
  const dayNumberString = date
    ? easternArabicNumeralFormatter.format(date.day)
    : "";

  const textStyle = [
    { fontSize: 16, textAlign: "center" },
    theme?.dayTextColor ? { color: theme.dayTextColor } : {},
    state === "disabled" &&
      (theme?.textDisabledColor
        ? { color: theme.textDisabledColor }
        : { color: "#d9e1e8" }),
    state === "today" &&
      (theme?.todayTextColor
        ? { color: theme.todayTextColor }
        : { color: "#00adf5", fontWeight: "bold" }),
    marking?.selected &&
      (theme?.selectedDayTextColor
        ? { color: theme.selectedDayTextColor }
        : { color: "white" }),
  ];

  const containerStyle = [
    {
      width: 32,
      height: 32,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 16,
    },
    marking?.selected && {
      backgroundColor:
        marking.selectedColor || theme?.selectedDayBackgroundColor || "#00adf5",
    },
  ];

  return (
    <TouchableOpacity
      style={containerStyle as any}
      onPress={() => onPress && onPress(date)}
      onLongPress={() => onLongPress && onLongPress(date)}
      disabled={state === "disabled"}
      activeOpacity={0.7}
      accessibilityRole={state === "disabled" ? undefined : "button"}
      accessibilityLabel={
        date ? `${date.day} ${date.toString("MMMM yyyy")}` : undefined
      }
    >
      <Text style={textStyle as any}>{dayNumberString}</Text>
      {marking?.marked && !marking.selected && (
        <View
          style={{
            width: 4,
            height: 4,
            borderRadius: 2,
            backgroundColor: marking.dotColor || theme?.dotColor || "#00adf5",
            position: "absolute",
            bottom: 4,
          }}
        />
      )}
    </TouchableOpacity>
  );
};

// Custom Header Component
const ArCustomHeader = ({ date }) => {
  const monthName = date.toString("MMMM");
  const yearString = easternArabicNumeralFormatter.format(date.getFullYear());

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        {monthName} {yearString}
      </Text>
    </View>
  );
};

const ArCalendar = (props) => {
  useEffect(() => {
    // Configure Arabic locale if missing
    if (!LocaleConfig.locales["ar"]) {
      LocaleConfig.locales["ar"] = {
        monthNames: [
          "يناير",
          "فبراير",
          "مارس",
          "أبريل",
          "مايو",
          "يونيو",
          "يوليو",
          "أغسطس",
          "سبتمبر",
          "أكتوبر",
          "نوفمبر",
          "ديسمبر",
        ],
        monthNamesShort: [
          "ينا.",
          "فبر.",
          "مار.",
          "أبر.",
          "ماي.",
          "يون.",
          "يول.",
          "أغس.",
          "سبت.",
          "أكت.",
          "نوف.",
          "ديس.",
        ],
        dayNames: [
          "الأحد",
          "الاثنين",
          "الثلاثاء",
          "الأربعاء",
          "الخميس",
          "الجمعة",
          "السبت",
        ],
        dayNamesShort: [
          "أحد",
          "اثنين",
          "ثلاثاء",
          "أربعاء",
          "خميس",
          "جمعة",
          "سبت",
        ],
        today: "اليوم",
      };
    }
    if (LocaleConfig.defaultLocale !== "ar") {
      LocaleConfig.defaultLocale = "ar";
    }
  }, []);

  return (
    <Calendar
      {...props}
      firstDay={6}
      dayComponent={ArCustomDay}
      renderHeader={(date) => <ArCustomHeader date={date} />}
      // Inverted arrow behavior:
      // Left arrow calls addMonth to move forward
      onPressArrowLeft={(addMonth) => addMonth()}
      // Right arrow calls subtractMonth to move backward
      onPressArrowRight={(subtractMonth) => subtractMonth()}
    />
  );
};

export default ArCalendar;
