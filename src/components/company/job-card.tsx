import { Link } from "@tanstack/react-router";
import { Briefcase, Clock, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface JobData {
  role: string;
  department: string;
  location: string;
  type: string;
  description: string;
  responsibilities: readonly string[];
}

interface JobCardProps {
  job: JobData;
}

function JobCard({ job }: JobCardProps) {
  return (
    <article className="flex flex-col justify-between gap-4 rounded-xl border border-line bg-panel/50 p-5 transition-colors hover:border-blue/30 sm:flex-row sm:items-center">
      <div>
        <h3 className="font-display text-base font-bold text-foreground">{job.role}</h3>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Briefcase className="size-3.5" /> {job.department}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5" /> {job.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5" /> {job.type}
          </span>
        </div>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary" className="shrink-0">
            View Role
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">{job.role}</DialogTitle>
            <DialogDescription className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-xs">
              <span>{job.department}</span>
              <span>{job.location}</span>
              <span>{job.type}</span>
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm leading-relaxed text-muted-foreground">{job.description}</p>
          <div>
            <p className="font-display text-sm font-semibold text-foreground">What you'll do</p>
            <ul className="mt-2 grid gap-2">
              {job.responsibilities.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-cyan" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <DialogFooter>
            <Button asChild className="w-full sm:w-auto">
              <Link to="/company/contact">Apply for this role</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </article>
  );
}

export { JobCard };
