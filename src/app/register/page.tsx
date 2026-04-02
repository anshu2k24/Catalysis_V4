"use client";
import React, { useState } from "react";
import Image from "next/image";
import pokeball1 from "../../../public/poke-balls/pokeball1.png";
import pokeball2 from "../../../public/poke-balls/pokeball2.png";
 
// ─── Constants ────────────────────────────────────────────────────────────────
export type EventId =
  | "pitch_perfect"
  | "typemaster"
  | "clash_royale"
  | "coding_relay"
  | "dsa_smackdown"
  | "technoseek";
 
export const TEAM_EVENTS: EventId[] = ["technoseek", "coding_relay"];
 
interface EventCard {
  id: EventId;
  name: string;
  type: string;
  imgSrc: string;
  iconBg: string;
}
 
const ALL_EVENTS: EventCard[] = [
  { id: "pitch_perfect",  name: "Pitch",        type: "STRATEGY TYPE", imgSrc: "/events/pitch.png",        iconBg: "#e74c3c" },
  { id: "typemaster",     name: "Typemaster",   type: "SKILL TYPE",    imgSrc: "/events/typemaster.png",   iconBg: "#27ae60" },
  { id: "clash_royale",   name: "Valorant",     type: "COMBAT TYPE",   imgSrc: "/events/clash-royale.png", iconBg: "#2980b9" },
  { id: "coding_relay",   name: "Coding Relay", type: "TECH TYPE",     imgSrc: "/events/coding-relay.png", iconBg: "#8e44ad" },
  { id: "dsa_smackdown",  name: "DSA",          type: "LOGIC TYPE",    imgSrc: "/events/dsa.png",          iconBg: "#e67e22" },
  { id: "technoseek",     name: "Technoseek",   type: "STRATEGY TYPE", imgSrc: "/events/technoseek.png",   iconBg: "#16a085" },
];
 
// ── Branch options: value = full name stored in DB, label = short name shown in pill ──
const BRANCHES: { value: string; label: string }[] = [
  { value: "Artificial Intelligence and Machine Learning",                                                          label: "AI & ML" },
  { value: "Aeronautical Engineering",                                                                              label: "Aeronautical Engg" },
  { value: "Automobile Engineering",                                                                                label: "Automobile Engg" },
  { value: "Biotechnology",                                                                                         label: "Biotechnology" },
  { value: "Chemical Engineering",                                                                                  label: "Chemical Engg" },
  { value: "Civil Engineering",                                                                                     label: "Civil Engg" },
  { value: "Computer Science and Business Systems",                                                                 label: "CS & Business Systems" },
  { value: "Computer Science and Design",                                                                           label: "CS & Design" },
  { value: "Computer Science and Engineering",                                                                      label: "CSE" },
  { value: "Computer Science & Engineering (Cyber Security)",                                                       label: "CSE (Cyber Security)" },
  { value: "Computer Science & Engineering (Data Science)",                                                         label: "CSE (Data Science)" },
  { value: "Computer Science & Engineering (IoT and Cyber Security Including Block Chain Technology)",              label: "CSE (IoT & Cyber Security)" },
  { value: "Electrical & Electronics Engineering",                                                                  label: "EEE" },
  { value: "Electronics & Communication Engineering",                                                               label: "ECE" },
  { value: "Electronics and Instrumentation Engineering",                                                           label: "EIE" },
  { value: "Electronics and Telecommunication Engineering",                                                         label: "E&TC" },
  { value: "Information Science and Engineering",                                                                   label: "ISE" },
  { value: "Mechanical Engineering",                                                                                label: "Mechanical Engg" },
  { value: "Medical Electronics Engineering",                                                                       label: "Medical Electronics" },
  { value: "Robotics and Artificial Intelligence",                                                                  label: "Robotics & AI" },
];
 
interface MemberData {
  name: string;
  usn: string;
  email: string;
  phone: string;
  semester: string;
  branch: string;
}
 
const BLANK_MEMBER: MemberData = { name: "", usn: "", email: "", phone: "", semester: "", branch: "" };
 
// ─── Main Page ────────────────────────────────────────────────────────────────
export default function RegisterPage() {
  const [selectedEvent, setSelectedEvent] = useState<EventId | "">("");
  const [loading, setLoading] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState<[MemberData, MemberData, MemberData]>([
    { ...BLANK_MEMBER },
    { ...BLANK_MEMBER },
    { ...BLANK_MEMBER },
  ]);
 
  const isTeam = selectedEvent !== "" && TEAM_EVENTS.includes(selectedEvent as EventId);
 
  const updateMember = (index: 0 | 1 | 2, field: keyof MemberData, value: string) => {
    setMembers((prev) => {
      const next = [...prev] as [MemberData, MemberData, MemberData];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return alert("Please select an event.");
    setLoading(true);
 
    const payload = {
      event: selectedEvent,
      team_name: isTeam ? teamName : "",
      member1: { ...members[0], semester: Number(members[0].semester) },
      member2: isTeam ? { ...members[1], semester: Number(members[1].semester) } : {},
      member3: isTeam ? { ...members[2], semester: Number(members[2].semester) } : {},
    };
 
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setLoading(false);
      alert(res.ok ? "Registration Successful! 🎉" : data.error || "Something went wrong.");
      if (res.ok) window.location.reload();
    } catch {
      setLoading(false);
      alert("Network error. Please try again.");
    }
  };
 
  return (
    <div className="bg-[#f5eaea] min-h-screen font-nunito">
 
      {/* ── Hero Title ── */}
      <div className="text-center pt-28 pb-32 px-6">
        <h1
          className="text-[#2d1216] text-5xl md:text-6xl mb-4 leading-tight"
          style={{ fontFamily: "'Gliker', 'Fredoka One', cursive", fontWeight: 900 }}
        >
          Trainer Registration
        </h1>
        <p className="max-w-xl mx-auto text-[#2d1216] text-sm md:text-base opacity-70 leading-relaxed font-medium">
          Start your adventure today. Select your battleground carefully. Strive with determination and skill to ascend and claim your rightful place as a true champion.
        </p>
      </div>
 
      {/* ── Stacked Card Section ── */}
      <div className="relative w-full">
        {/* Layer 1 — lightest pink */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-[#FF94a5] rounded-t-[2.5rem] border-t-2 border-x-2 border-black z-[1]" style={{ transform: "translateY(-6.0rem)" }} />
        {/* Layer 2 */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-[#fc7d8d] rounded-t-[2.5rem] border-t-2 border-x-2 border-black z-[2]" style={{ transform: "translateY(-3.0rem)" }} />
        {/* Layer 3 */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-[#e06675] rounded-t-[2.5rem] border-t-2 border-x-2 border-black z-[3]" style={{ transform: "translateY(-1.3rem)" }} />
 
        {/* ── Main Red Card ── */}
        <div className="relative bg-[#dd273e] rounded-t-[2.5rem] border-t-2 border-x-2 border-black z-[10] overflow-hidden pt-16 pb-0">
 
          {/* Pokeball watermark — top right */}
          <div className="pointer-events-none absolute top-[-2%] right-[-8%] opacity-[0.12] select-none">
            <Image src={pokeball2} alt="pokeball1" width={420} height={420} className="rotate-[-10deg]" />
          </div>
          {/* Pokeball watermark — left mid */}
          <div className="pointer-events-none absolute top-[38%] left-[-10%] opacity-[0.12] select-none">
                <Image src={pokeball1} alt="pokeball2" width={380} height={380} className="rotate-[15deg]" />
              </div>
 
          {/* Pointing hand — bottom left, above the black strip */}
          {/* <div className="pointer-events-none absolute bottom-[8rem] left-0 w-40 md:w-52 select-none z-[5]">
            <Image
              src="/hand.png"
              alt=""
              width={208}
              height={208}
              className="brightness-0 invert -rotate-12 -translate-x-6"
            />
          </div> */}
 
          <form onSubmit={handleSubmit} className="relative z-20 w-full max-w-4xl mx-auto px-6 md:px-12 pb-0 space-y-14">
 
            {/* ══ PERSONAL DETAILS ══ */}
            <Section title="PERSONAL DETAILS" />
            <MemberForm
              member={members[0]}
              index={0}
              label="Member 1"
              onChange={updateMember}
              showLabel={false}
            />
 
            {/* ══ SELECT YOUR EVENTS ══ */}
            <div className="space-y-8 -mt-4">
              <Section title="SELECT YOUR EVENTS" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto">
                {ALL_EVENTS.map((ev) => (
                  <EventCardItem
                    key={ev.id}
                    event={ev}
                    selected={selectedEvent === ev.id}
                    onSelect={() => setSelectedEvent(ev.id)}
                  />
                ))}
              </div>
            </div>
 
            {/* ══ TEAM DETAILS (only for team events) ══ */}
            {isTeam && (
              <div className="space-y-8 transition-all duration-300">
                <Section title="TEAM DETAILS" />
                <div className="max-w-3xl mx-auto">
                  <InputField
                    label="Team Name"
                    placeholder="Enter your team name"
                    value={teamName}
                    onChange={setTeamName}
                    required
                  />
                </div>
              </div>
            )}
 
            {/* ══ ACADEMIC DETAILS ══ */}
            <div className="space-y-8">
              <Section title="ACADEMIC DETAILS" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 max-w-3xl mx-auto">
                <SelectField
                  label="Semester"
                  placeholder="Select your semester"
                  value={members[0].semester}
                  options={["1","2","3","4","5","6","7","8"].map((o) => ({ value: o, label: `Semester ${o}` }))}
                  onChange={(v) => updateMember(0, "semester", v)}
                />
                <BranchSelectField
                  label="Branch"
                  placeholder="Select your branch"
                  value={members[0].branch}
                  onChange={(v) => updateMember(0, "branch", v)}
                />
              </div>
            </div>
 
            {/* ══ MEMBER 2 (team events) ══ */}
            {isTeam && (
              <div className="space-y-8">
                <Section title="MEMBER 2 DETAILS" />
                <MemberForm member={members[1]} index={1} label="Member 2" onChange={updateMember} showLabel />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 max-w-3xl mx-auto">
                  <SelectField label="Semester" placeholder="Select semester" value={members[1].semester} options={["1","2","3","4","5","6","7","8"].map((o) => ({ value: o, label: `Semester ${o}` }))} onChange={(v) => updateMember(1, "semester", v)} />
                  <BranchSelectField label="Branch" placeholder="Select branch" value={members[1].branch} onChange={(v) => updateMember(1, "branch", v)} />
                </div>
              </div>
            )}
 
            {/* ══ MEMBER 3 (team events) ══ */}
            {isTeam && (
              <div className="space-y-8">
                <Section title="MEMBER 3 DETAILS" />
                <MemberForm member={members[2]} index={2} label="Member 3" onChange={updateMember} showLabel />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 max-w-3xl mx-auto">
                  <SelectField label="Semester" placeholder="Select semester" value={members[2].semester} options={["1","2","3","4","5","6","7","8"].map((o) => ({ value: o, label: `Semester ${o}` }))} onChange={(v) => updateMember(2, "semester", v)} />
                  <BranchSelectField label="Branch" placeholder="Select branch" value={members[2].branch} onChange={(v) => updateMember(2, "branch", v)} />
                </div>
              </div>
            )}
 
            {/* ══ Checkbox + Submit — sits inside red card, above the black strip ══ */}
            <div className="flex flex-col items-start gap-5 pt-6 pb-24 max-w-3xl mx-auto">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  className="w-4 h-4 border-2 border-black rounded accent-[#dd273e] cursor-pointer"
                />
                <span className="text-white font-semibold text-sm">
                  I agree to follow all event rules and guidelines.
                </span>
              </label>
 
              {/* Offset shadow button */}
              <div className="relative group cursor-pointer">
                <div className="absolute inset-0 rounded-2xl bg-black z-0" style={{ transform: "translate(4px, 6px)" }} />
                <button
                  type="submit"
                  disabled={loading || !selectedEvent}
                  className="relative z-10 bg-white text-black font-black tracking-widest uppercase px-12 py-3.5 rounded-2xl border-2 border-black transition-transform duration-150 group-hover:-translate-y-0.5 group-active:translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                  style={{ letterSpacing: "0.15em" }}
                >
                  {loading ? "Registering..." : "REGISTER NOW"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
 
// ─── Sub-components ───────────────────────────────────────────────────────────
 
function Section({ title }: { title: string }) {
  return (
    <div className="flex justify-center">
      <div className="bg-[#b31d2f] px-8 py-2 rounded-full border-2 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
        <span className="text-white font-black text-[9px] tracking-[0.25em] uppercase">{title}</span>
      </div>
    </div>
  );
}
 
function MemberForm({
  member,
  index,
  onChange,
  showLabel,
}: {
  member: MemberData;
  index: 0 | 1 | 2;
  label: string;
  onChange: (i: 0 | 1 | 2, f: keyof MemberData, v: string) => void;
  showLabel: boolean;
}) {
  const req = index === 0;
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {showLabel && (
        <p className="text-white/60 text-xs font-bold uppercase tracking-widest text-center -mb-2">
          — Member {index + 1} —
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
        <InputField label="Name" placeholder="Enter your full name" value={member.name} onChange={(v) => onChange(index, "name", v)} required={req} />
        <InputField label="USN" placeholder="Enter your USN / ID" value={member.usn} onChange={(v) => onChange(index, "usn", v)} required={req} />
        <InputField label="Email" placeholder="Enter your email address" value={member.email} onChange={(v) => onChange(index, "email", v)} required={req} type="email" />
        <InputField label="Phone Number" placeholder="Enter your phone number" value={member.phone} onChange={(v) => onChange(index, "phone", v)} required={req} type="tel" />
      </div>
    </div>
  );
}
 
function InputField({
  label,
  placeholder,
  value,
  onChange,
  required,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-white ml-2 font-semibold text-base"
        style={{ fontFamily: "'Gliker','Fredoka One',cursive" }}
      >
        {label}
      </label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-5 py-3.5 rounded-full border-2 border-black bg-white text-black text-sm placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-white/40 transition"
      />
    </div>
  );
}
 
// Generic select — takes { value, label }[] options
function SelectField({
  label,
  placeholder,
  value,
  options,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-white ml-2 font-semibold text-base"
        style={{ fontFamily: "'Gliker','Fredoka One',cursive" }}
      >
        {label}
      </label>
      <div className="relative">
        <select
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-5 py-3.5 rounded-full border-2 border-black bg-white text-black text-sm outline-none appearance-none cursor-pointer"
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2">
          <svg width="14" height="9" viewBox="0 0 14 9" fill="none">
            <path d="M1 1L7 7L13 1" stroke="#dd273e" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
 
// Branch-specific select — abbreviated labels in pill, full name as stored value
function BranchSelectField({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-white ml-2 font-semibold text-base"
        style={{ fontFamily: "'Gliker','Fredoka One',cursive" }}
      >
        {label}
      </label>
      <div className="relative">
        <select
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-5 py-3.5 rounded-full border-2 border-black bg-white text-black text-sm outline-none appearance-none cursor-pointer"
        >
          <option value="">{placeholder}</option>
          {BRANCHES.map((b) => (
            <option key={b.value} value={b.value}>{b.label}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2">
          <svg width="14" height="9" viewBox="0 0 14 9" fill="none">
            <path d="M1 1L7 7L13 1" stroke="#dd273e" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
 
function EventCardItem({
  event,
  selected,
  onSelect,
}: {
  event: EventCard;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect()}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-full border-2 border-black cursor-pointer transition-all duration-200 select-none
        ${selected
          ? "bg-[#fdf3d7] shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
          : "bg-[#f5eaea] hover:bg-[#fdf3d7]/60"
        }`}
    >
      {/* Icon circle */}
      <div
        className="w-11 h-11 rounded-full border-2 border-black flex items-center justify-center shrink-0 overflow-hidden"
        style={{ background: event.iconBg }}
      >
        <Image
          src={event.imgSrc}
          alt={event.name}
          width={44}
          height={44}
          className="w-full h-full object-cover"
        />
      </div>
 
      {/* Text */}
      <div className="flex-1 min-w-0">
        <p
          className="text-black text-sm leading-tight font-bold truncate"
          style={{ fontFamily: "'Gliker','Fredoka One',cursive" }}
        >
          {event.name}
        </p>
        <p className="text-[9px] font-bold text-black/40 uppercase tracking-wider mt-0.5">
          {event.type}
        </p>
      </div>
 
      {/* Radio indicator */}
      <div className="w-8 h-8 rounded-full border-2 border-dashed border-black/30 flex items-center justify-center shrink-0">
        {selected && <div className="w-4 h-4 bg-black rounded-full" />}
      </div>
    </div>
  );
}