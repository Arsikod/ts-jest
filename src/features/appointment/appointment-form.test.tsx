import {
  clickAction,
  element,
  elements,
  field,
  form,
  initializeReactContainer,
  render,
  submitButton,
} from "../../test/react-test-utils";
import { today, todayAt, tomorrowAt } from "../../test/builders/time";

import { AppointmentForm } from "./appointment-form";

export type AppointmentItem = {
  service?: string;
  startsAt?: number;
};

describe("AppointmentForm", () => {
  const blankAppointment: AppointmentItem = {
    service: "",
  };

  const selectableServices = ["Cut", "Dry"];

  const availableTimeSlots = [
    {
      startsAt: todayAt(9),
    },
    {
      startsAt: todayAt(9, 30),
    },
    {
      startsAt: tomorrowAt(9, 30),
    },
  ];

  const testProps = {
    today,
    selectableServices,
    availableTimeSlots,
    original: blankAppointment,
  };

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
    render(<AppointmentForm {...testProps} />);
    expect(form()).not.toBeNull();
  });

  describe("service field", () => {
    it("renders as a select box", () => {
      render(<AppointmentForm {...testProps} original={blankAppointment} />);
      const serviceElement = field("service");

      expect(serviceElement.tagName).toEqual("SELECT");
    });

    it("lists all salon services", () => {
      render(<AppointmentForm {...testProps} />);

      expect(labelsOfAllOptions(field("service"))).toEqual(
        expect.arrayContaining(selectableServices)
      );
    });

    it("has a blank value as the first option", () => {
      render(<AppointmentForm {...testProps} />);

      const firstOption = field("service").firstChild as HTMLOptionElement;

      expect(firstOption.value).toEqual("");
    });

    it("pre-selects the existing value", () => {
      const appointment = { service: "Dry" };

      render(<AppointmentForm {...testProps} original={appointment} />);

      const option = findOption(field("service"), "Dry");

      expect(option?.selected).toBe(true);
    });
  });

  describe("time slot table", () => {
    it("renders a table for time slots with an id", () => {
      render(<AppointmentForm {...testProps} />);

      expect(element("table#time-slots")).not.toBeNull();
    });

    it("renders a time slot for every half an hour between open and close times", () => {
      render(
        <AppointmentForm {...testProps} salonOpensAt={9} salonClosesAt={11} />
      );

      const timesOfDayHeadings = elements("tbody > tr > th");

      expect(timesOfDayHeadings[0]).toContainText("09:00");
      expect(timesOfDayHeadings[1]).toContainText("09:30");
      expect(timesOfDayHeadings[2]).toContainText("10:00");
    });

    it("renders an empty cell at the start of the header row", () => {
      render(<AppointmentForm {...testProps} />);

      const headerRow = element("thead > tr");
      expect(headerRow.firstChild).toContainText("");
    });

    it("renders a week of available dates", () => {
      const specificDate = new Date(2018, 11, 1);

      render(<AppointmentForm {...testProps} today={specificDate} />);

      const dates = elements("thead > tr > th:not(:first-child)");
      expect(dates).toHaveLength(7);
      expect(dates[0]).toContainText("Sat 01");
      expect(dates[1]).toContainText("Sun 02");
      expect(dates[6]).toContainText("Fri 07");
    });

    //radio buttons

    it("renders radio buttons in the correct table cell positions", () => {
      render(<AppointmentForm {...testProps} />);

      expect(cellWithRadioButtons()).toEqual([0, 7, 8]);
    });

    it("does not render radio buttons for unavailable time slots", () => {
      render(<AppointmentForm {...testProps} availableTimeSlots={[]} />);
      expect(elements('input[type="radio"]')).toHaveLength(0);
    });

    it("sets radio button values to the startsAt value of corresponding appointment", () => {
      render(
        <AppointmentForm
          original={blankAppointment}
          availableTimeSlots={availableTimeSlots}
          today={today}
        />
      );

      const allRadioValues = elements<HTMLInputElement>(
        'input[type="radio"]'
      ).map(({ value }) => parseInt(value));

      const allSlotTimes = availableTimeSlots.map(({ startsAt }) => startsAt);

      expect(allRadioValues).toEqual(allSlotTimes);
    });

    it("pre-selects the existing value", () => {
      const appointment = { startsAt: availableTimeSlots[1].startsAt };

      render(
        <AppointmentForm
          original={appointment}
          availableTimeSlots={availableTimeSlots}
          today={today}
        />
      );

      expect(startsAtField(1).checked).toBe(true);
    });

    it("renders a submit button", () => {
      render(<AppointmentForm {...testProps} />);

      expect(submitButton()).not.toBeNull();
    });

    it("saves existing value when submitted", () => {
      expect.hasAssertions();

      const appointment = {
        startsAt: availableTimeSlots[1].startsAt,
      };

      render(
        <AppointmentForm
          original={appointment}
          availableTimeSlots={availableTimeSlots}
          today={today}
          onSubmit={(appointment) => {
            expect(appointment.startsAt).toEqual(
              availableTimeSlots[1].startsAt
            );
          }}
        />
      );

      clickAction(submitButton());
    });

    it("saves new value when submitted", () => {
      expect.hasAssertions();
      const appointment = { startsAt: availableTimeSlots[0].startsAt };

      render(
        <AppointmentForm
          original={appointment}
          availableTimeSlots={availableTimeSlots}
          today={today}
          onSubmit={(appointment) => {
            expect(appointment.startsAt).toEqual(
              availableTimeSlots[1].startsAt
            );
          }}
        />
      );

      clickAction(startsAtField(1));
      clickAction(submitButton());
    });
  });
});

function cellWithRadioButtons() {
  const result = elements("input[type='radio']").map((radio) =>
    elements("td").indexOf(radio.parentNode as HTMLTableCellElement)
  );
  return result;
}

function startsAtField(index: number) {
  return elements<HTMLInputElement>('input[name="startsAt"]')[index];
}
