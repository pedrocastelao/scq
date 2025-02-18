import { useState, useEffect } from "react";

function WeekNavigator() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekRange, setWeekRange] = useState("");

  // Get the start and end dates of the current week
  const getWeekDates = (date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay()); // Start of week (Sunday)

    const end = new Date(start);
    end.setDate(start.getDate() + 6); // End of week (Saturday)

    // Return valid dates
    return { start, end };
  };

  // Format date to DD/MM/YYYY
  const formatDate = (date) => {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Update week range text
  const updateWeekRange = (date) => {
    const { start, end } = getWeekDates(date);
    setWeekRange(`${formatDate(start)} - ${formatDate(end)}`);
  };

  // Handle previous week
  const handlePreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
    updateWeekRange(newDate);
  };

  // Handle next week
  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
    updateWeekRange(newDate);
  };

  // Handle week selector change
  const handleWeekChange = (e) => {
    const selectedDate = new Date(e.target.value);
    if (selectedDate.toString() !== "Invalid Date") {
      setCurrentDate(selectedDate);
      updateWeekRange(selectedDate);
    }
  };

  // Get current week value for input
  const getCurrentWeekValue = () => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - date.getDay()); // Ensure correct start of the week
    return date.toISOString().slice(0, 10).replace(/-/g, "-W");
  };

  // Initialize week range on component mount
  useEffect(() => {
    updateWeekRange(currentDate);
  }, []);

  return (
    <div className="week-navigator mb-4">
      <div className="row align-items-center">
        <div className="col-md-4">
          <button
            className="btn btn-outline-primary"
            onClick={handlePreviousWeek}
          >
            <i className="bi bi-chevron-left"></i> Semana Anterior
          </button>
        </div>
        <div className="col-md-4 text-center">
          <h5 className="mb-0">{weekRange}</h5>
        </div>
        <div className="col-md-4 text-end">
          <button className="btn btn-outline-primary" onClick={handleNextWeek}>
            Próxima Semana <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>

      {/* Week Days Display */}
      <div className="row mt-3">
        <div className="col">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(
                    (day, index) => (
                      <th key={index} className="text-center">
                        {day}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {Array(7)
                    .fill(null)
                    .map((_, index) => {
                      const date = new Date(currentDate);
                      date.setDate(date.getDate() - date.getDay() + index);
                      return (
                        <td key={index} className="text-center">
                          {date.getDate()}
                        </td>
                      );
                    })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeekNavigator;
