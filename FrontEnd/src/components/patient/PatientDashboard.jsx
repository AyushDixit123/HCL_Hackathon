import { useEffect, useState } from "react";
import {
  fetchPatientDashboard,
  fetchWellnessScore,
  fetchReminders,
} from "../api/patientApi";

import StatCard from "../components/StatCard";
import ProgressBar from "../components/ProgressBar";
import ReminderItem from "../components/ReminderItem";

export default function PatientDashboard() {

  /* MOCK PATIENT ID */
  const patientId = "demo123";

  const [dashboard, setDashboard] = useState(null);
  const [score, setScore] = useState(0);
  const [reminders, setReminders] = useState([]);

  useEffect(() => {

    /* TEMP MOCK DATA (works even without backend) */
    setDashboard({
      steps: 3620,
      stepGoal: 8000,
      sleep: 6.5,
      sleepGoal: 8,
      water: 5,
      waterGoal: 8,
      activeTime: 56,
      distance: 12.3,
      calories: 1713,
    });

    setScore(72);

    setReminders([
      { id: 1, text: "Drink Water", time: "5:30 PM", type: "Hydration" },
      { id: 2, text: "Evening Walk", time: "7:00 PM", type: "Exercise" },
      { id: 3, text: "Blood Test Reminder", time: "Tomorrow", type: "Preventive" },
    ]);

    /* REAL BACKEND CALLS (UNCOMMENT WHEN API READY) */

    /*
    fetchPatientDashboard(patientId).then(res =>
      setDashboard(res.data)
    );

    fetchWellnessScore(patientId).then(res =>
      setScore(res.data.score)
    );

    fetchReminders(patientId).then(res =>
      setReminders(res.data)
    );
    */

  }, []);

  if (!dashboard) return <div>Loading...</div>;

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Welcome Back 👋
        </h1>
        <p className="text-slate-400">
          Here's your wellness snapshot for today
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard
          title="Steps"
          value={dashboard.steps}
          unit="steps"
          subtitle={`Goal: ${dashboard.stepGoal}`}
        />

        <StatCard
          title="Sleep"
          value={dashboard.sleep}
          unit="hrs"
          subtitle={`Goal: ${dashboard.sleepGoal}`}
        />

        <StatCard
          title="Active"
          value={dashboard.activeTime}
          unit="min"
          subtitle={`${dashboard.distance} km | ${dashboard.calories} kcal`}
        />
      </div>

      {/* GOALS */}
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <h2 className="text-xl font-semibold">
          Daily Goals
        </h2>

        <ProgressBar
          label="Steps"
          value={dashboard.steps}
          max={dashboard.stepGoal}
        />

        <ProgressBar
          label="Sleep (Hours)"
          value={dashboard.sleep}
          max={dashboard.sleepGoal}
        />

        <ProgressBar
          label="Water Intake (Glasses)"
          value={dashboard.water}
          max={dashboard.waterGoal}
        />
      </section>

      {/* WELLNESS SCORE */}
      <section className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">
              Wellness Score
            </h2>
            <p className="text-sm opacity-80">
              Based on activity, sleep & compliance
            </p>
          </div>

          <div className="text-4xl font-bold">
            {score}/100
          </div>
        </div>
      </section>

      {/* REMINDERS */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Reminders
        </h2>

        {reminders.map(r => (
          <ReminderItem
            key={r.id}
            {...r}
          />
        ))}
      </section>

    </div>
  );
}
