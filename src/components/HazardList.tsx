import { useState } from "react";
import type { Hazard } from "../types/hazard";
import { useHazardStore } from "../stores/useHazardStore";

import HazardCard from "./HazardCard";
import Modal from "../components/Modal";
import HazardForm from "../components/HazardForm";

type Props = {
  assessmentId: string;
  hazards: Hazard[];
  isFetching: boolean;
  onRemoveHazard: (hazardId: string, assessmentId: string) => Promise<void>;
};

export default function HazardList({
  assessmentId,
  hazards,
  isFetching,
  onRemoveHazard,
}: Props) {
  const addHazard = useHazardStore((s) => s.addHazard);
  const updateHazard = useHazardStore((s) => s.updateHazard);
  const [isAddHazardOpen, setIsAddHazardOpen] = useState(false);
  const [isUpdateHazardOpen, setIsUpdateHazardOpen] = useState(false);
  const [activeHazard, setActiveHazard] = useState<Hazard>();

  const handleAddHazard = (payload: Partial<Hazard>) => {
    addHazard(payload);
    setIsAddHazardOpen(false);
  };

  const openEditHazard = (
    payload: Hazard | undefined,
    open: boolean = true,
  ) => {
    setActiveHazard(payload);
    setIsUpdateHazardOpen(open);
  };

  const handleUpdateHazard = (payload: Hazard) => {
    if (activeHazard) updateHazard(activeHazard.id, payload);
    openEditHazard(undefined, false);
  };

  return (
    <section className="section">
      <div className="section-header flex-between">
        <h2>Hazards</h2>{" "}
        <button
          className="primary-button"
          onClick={() => setIsAddHazardOpen(true)}
        >
          Add Hazard +
        </button>
      </div>

      <Modal
        isOpen={isAddHazardOpen}
        title="Add Hazard"
        onClose={() => setIsAddHazardOpen(false)}
      >
        <HazardForm assessmentId={assessmentId} onSubmit={handleAddHazard} />
      </Modal>

      <Modal
        isOpen={isUpdateHazardOpen}
        title="Edit Hazard"
        onClose={() => setIsUpdateHazardOpen(false)}
      >
        <HazardForm
          assessmentId={assessmentId}
          hazard={activeHazard}
          onSubmit={handleUpdateHazard}
        />
      </Modal>

      {isFetching && <p className="state-text">Loading hazards...</p>}

      {!isFetching && hazards.length === 0 && (
        <p className="state-text">No hazards found.</p>
      )}

      <div className="stack">
        {hazards.map((hazard) => (
          <HazardCard
            key={hazard.id}
            hazard={hazard}
            onRemove={() => onRemoveHazard(hazard.id, hazard.assessment_id)}
            onEdit={() => openEditHazard(hazard)}
          />
        ))}
      </div>
    </section>
  );
}
