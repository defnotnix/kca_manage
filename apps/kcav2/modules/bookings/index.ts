import { _List } from "./pages/list";
import { _Calendar } from "./pages/calendar";
import { _New } from "./pages/new";
import { _Edit } from "./pages/edit";
import { _Req } from "./pages/req";
import { _ClientBooking } from "./pages/client-booking";

const Module: any = {
  List: _List,
  New: _New,
  Calendar: _Calendar,
  Edit: _Edit,
  Request: _Req,
  ClientBooking: _ClientBooking,
};

export { Module };
