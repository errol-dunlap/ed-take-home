import React from "react";
import { Box } from "@chakra-ui/react";
import voca from "voca";
import dayjs from "dayjs";

dayjs.extend(require("dayjs/plugin/advancedFormat"));
dayjs.extend(require("dayjs/plugin/utc"));
dayjs.extend(require("dayjs/plugin/relativeTime"));
dayjs.extend(require("dayjs/plugin/timezone"));

dayjs.tz.setDefault("America/New_York");

export default function Comment({ details }) {
  const { id, message, name, created } = details;

  function showDateTime(created) {
    const date = dayjs(created).utc("z").local();

    if (date.isAfter(dayjs().startOf("year").format())) {
      // is it within this year
      if (date.isAfter(dayjs().subtract(1, "week"))) {
        // if within a week
        if (date.isAfter(dayjs().subtract(23, "hours"))) {
          // if within a day
          return date.fromNow();
        }
        return date.format("[on] dddd [at] ha");
      }
      return date.format("[on] MMMM Do [at] ha");
    }
    return date.format("[on] MMMM Do, YYYY"); // include year if older than this year
  }
  return (
    <Box
      border="3px solid #000"
      borderRadius={"10px"}
      p="3"
      mb="5"
      textAlign={"left"}
      key={id}
    >
      <Box fontWeight={"bold"}>{voca.capitalize(message)}</Box>
      <Box className="meta" mt="3">
        {voca.titleCase(name)} {showDateTime(created)}
      </Box>
    </Box>
  );
}
