import {
  BookOpen, Percent, FileText, ShieldCheck, Wallet, Users, Rocket,
  MessageCircle, Briefcase, Wrench, Calculator, Calendar, ClipboardCheck,
  CheckCircle2, ListChecks, HeartPulse, HelpCircle, Search, Menu, X,
  ArrowRight, Phone, Mail, Send, ChevronDown, TrendingUp, PieChart,
  Banknote, Scale, Building2, User, Sparkles, Bell, ExternalLink, Clock,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  BookOpen, Percent, FileText, ShieldCheck, Wallet, Users, Rocket,
  MessageCircle, Briefcase, Wrench, Calculator, Calendar, ClipboardCheck,
  CheckCircle2, ListChecks, HeartPulse, HelpCircle, Search, Menu, X,
  ArrowRight, Phone, Mail, Send, ChevronDown, TrendingUp, PieChart,
  Banknote, Scale, Building2, User, Sparkles, Bell, ExternalLink, Clock,
};

export function Icon({
  name,
  className,
  size = 20,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
  const Cmp = ICONS[name] ?? HelpCircle;
  return <Cmp className={className} size={size} strokeWidth={1.75} />;
}
