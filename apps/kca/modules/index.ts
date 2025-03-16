import { Module as Players } from "./players";

import { Module as Sessions } from "./sessions";
import { Module as SessionMembers } from "./sessionMembers";
import { Module as Tournaments } from "./tournament";
import { Module as TournamentMembers } from "./tournamentMembers";
import { Module as Invoice } from "./invoice";

import { Module as Packages } from "./package";
import { Module as Grounds } from "./grounds";
import { Module as AddonsCategory } from "./addon-category";
import { Module as Addons } from "./addon";
import { Module as Routine } from "./routine";
import { Module as Timeframe } from "./timeframe";

import { Module as Accounts } from "./accounts";
import { Module as Bookings } from "./bookings";
import { Module as TakeAttendance } from "./takeAttendance";
import { Module as TakePerformance } from "./takePerformance";
import { Module as Teams } from "./teams";
import { Module as TeamMembers } from "./teamMembers";

import { _Doc as PerformanceDoc } from "./performanceDoc";

export const Modules = {
  Players,
  Sessions,
  SessionMembers,
  Tournaments,
  Invoice,
  Packages,
  Accounts,
  Bookings,
  TakeAttendance,
  TakePerformance,
  Teams,
  TeamMembers,
  Grounds,
  Addons,
  AddonsCategory,
  Routine,
  Timeframe,
  TournamentMembers,
  PerformanceDoc,
};
