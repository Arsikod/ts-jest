import {
  element,
  elements,
  field,
  form,
  initializeReactContainer,
  render,
} from "../../test/react-test-utils";

import { AppointmentForm } from "./appointment-form";

describe("AppointmentForm", () => {
  const blankAppointment = {
    service: "",
  };

  const selectableServices = ["Cut", "Dry"];

  beforeEach(() => {
    initializeReactContainer();
  });

  function labelsOfAllOptions(element: HTMLSelectElement) {
    return Array.from(element.childNodes, (node) => node.textContent);
  }

  function findOption(
    selectBox: HTMLSelectElement,
    textContent: string
  ): HTMLOptionElement {
    const options = Array.from(selectBox.options);
    return options.find((option) => option.textContent === textContent);
  }

  it("renders a form", () => {
    render(<AppointmentForm original={blankAppointment} />);
    expect(form()).not.toBeNull();
  });

  describe("service field", () => {
    it("renders as a select box", () => {
      render(<AppointmentForm original={blankAppointment} />);
      const serviceElement = field("service");

      expect(serviceElement.tagName).toEqual("SELECT");
    });

    it("lists all salon services", () => {
      render(
        <AppointmentForm
          selectableServices={selectableServices}
          original={blankAppointment}
        />
      );

      expect(labelsOfAllOptions(field("service"))).toEqual(
        expect.arrayContaining(selectableServices)
      );
    });

    it("has a blank value as the first option", () => {
      render(<AppointmentForm original={blankAppointment} />);

      const firstOption = field("service").firstChild as HTMLOptionElement;

      expect(firstOption.value).toEqual("");
    });

    it("pre-selects the existing value", () => {
      const appointment = { service: "Dry" };

      render(
        <AppointmentForm
          selectableServices={selectableServices}
          original={appointment}
        />
      );

      const option = findOption(field("service"), "Dry");

      expect(option?.selected).toBe(true);
    });
  });

  describe("time slot table", () => {
    it("renders a table for time slots with an id", () => {
      render(<AppointmentForm original={blankAppointment} />);

      expect(element("table#time-slots")).not.toBeNull();
    });

    it("renders a time slot for every half an hour between open and close times", () => {
      render(
        <AppointmentForm
          original={blankAppointment}
          salonOpensAt={9}
          salonClosesAt={11}
        />
      );

      const timesOfDayHeadings = elements("tbody > tr > th");

      expect(timesOfDayHeadings[0]).toContainText("09:00");
      expect(timesOfDayHeadings[1]).toContainText("09:30");
      expect(timesOfDayHeadings[2]).toContainText("10:00");
    });

    it("renders an empty cell at the start of the header row", () => {
      render(<AppointmentForm original={blankAppointment} />);

      const headerRow = element("thead > tr");
      expect(headerRow.firstChild).toContainText("");
    });

    it("renders a week of available dates", () => {
      const specificDate = new Date(2018, 11, 1);

      render(
        <AppointmentForm original={blankAppointment} today={specificDate} />
      );

      const dates = elements("thead > tr > th:not(:first-child)");
      expect(dates).toHaveLength(7);
      expect(dates[0]).toContainText("Sat 01");
      expect(dates[1]).toContainText("Sun 02");
      expect(dates[6]).toContainText("Fri 07");
    });
  });
});
