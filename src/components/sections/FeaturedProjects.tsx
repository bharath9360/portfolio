"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { Project } from "@/types";
import ProjectCard from "../ui/ProjectCard";
import ArchitectureModal from "../ui/ArchitectureModal";
import { Layers, Terminal } from "lucide-react";

export default function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <section
      id="projects"
      className="relative z-10 py-24 sm:py-32 px-4 sm:px-6 md:px-12 bg-[#04050a] border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-medium text-[#00f2fe] mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe]" />
              <span>Selected Projects</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-2xl"
            >
              Things I&apos;ve{" "}
              <span className="text-gradient-cyan">Built & Shipped.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg font-light max-w-md leading-relaxed"
          >
            A curated selection of production systems specializing in autonomous LangGraph workflows, real-time hardware bridges, and resilient full-stack architectures.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {portfolioData.projects.map((project, idx) => (
            <div
              key={project.id}
              className="col-span-1"
            >
              <ProjectCard
                project={project}
                index={idx}
                onOpenModal={handleOpenModal}
              />
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-16 p-8 rounded-3xl glass-panel flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#7f52ff]/10 border border-[#7f52ff]/30 flex items-center justify-center text-[#7f52ff] flex-shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Want to review internal source code or architecture diagrams?
              </h3>
              <p className="text-sm text-slate-400 font-light mt-0.5">
                Full GitHub repositories and technical documentation are available upon request for engineering teams.
              </p>
            </div>
          </div>
          <a
            href={portfolioData.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-white/[0.05] border border-white/10 hover:border-white/20 text-white text-xs font-mono uppercase tracking-wider hover:bg-white/10 transition-all whitespace-nowrap"
          >
            Explore GitHub Org ↗
          </a>
        </div>
      </div>

      {/* Deep Architecture Modal */}
      <ArchitectureModal
        project={selectedProject}
        isOpen={modalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
