import {
  element,
  initializeReactContainer,
  render,
  renderAndWait,
} from "./react-test-utils";
import { today, todayAt, tomorrow, tomorrowAt } from "./builders/time";

import { AppointmentsDayView } from "../features/appointment/appointment";
import { AppointmentsDayViewLoader } from "../appointmentsDayViewLoader";
import { fetchResponseOk } from "./builders/fetch";

jest.mock("../features/appointment/appointment", () => ({
  AppointmentsDayView: jest.fn(() => <div id="AppointmentsDayView" />),
}));

describe("AppointmentsDayViewLoader", () => {
  const appointments = [
    {
      startsAt: todayAt(9),
    },
    {
      startsAt: todayAt(10),
    },
  ];

  beforeEach(() => {
    initializeReactContainer();

    jest
      .spyOn(global, "fetch")
      .mockResolvedValue(fetchResponseOk(appointments) as Response);
  });

  it("renders the AppointmentsDayView", async () => {
    await renderAndWait(<AppointmentsDayViewLoader />);
    expect(AppointmentsDayView).not.toBeNull();
  });

  it("initially passes empty array of appointments to AppointmentsDayView", async () => {
    await renderAndWait(<AppointmentsDayViewLoader />);

    expect(AppointmentsDayView).toBeRenderedWithProps({
      appointments,
    });
  });

  it("fetches data when component is mounted", async () => {
    const from = todayAt(0);
    const to = todayAt(23, 59, 59, 999);
    await renderAndWait(<AppointmentsDayViewLoader today={today} />);

    expect(fetch).toHaveBeenCalledWith(`/appointments/${from}-${to}`, {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

  it("passes fetched appointments to AppointmentsDayView once fetched", async () => {
    await renderAndWait(<AppointmentsDayViewLoader today={today} />);

    expect(AppointmentsDayView).toBeRenderedWithProps({
      appointments,
    });
  });

  //not working probably to two useEffect calls
  it("re-requests appointment when today prop changes", async () => {
    const from = todayAt(0);
    const to = tomorrowAt(23, 59, 59, 999);

    await renderAndWait(<AppointmentsDayViewLoader today={today} />);

    await renderAndWait(<AppointmentsDayViewLoader today={tomorrow} />);

    expect(global.fetch).toHaveBeenLastCalledWith(
      `/appointments/${from}-${to}`,
      expect.anything()
    );
  });
});
