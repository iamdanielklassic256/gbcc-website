import {
	Radio,
	BookOpen,
	Heart,
	Flame,
	Shield,
	FileText,
} from "lucide-react";

export interface EventItem {
	id: string;
	title: string;
	description: string;
	date: string;
	duration: string;
	location: string;
	image: string;
}

export const weeklyPrograms = [
	{
		day: "Sunday",
		time: "7:00 PM - 8:00 PM",
		title: "Radio Program",
		description: "Officially resumed! Support the broadcast by donating 10,000/= per month.",
		icon: Radio,
		color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
		border: "hover:border-purple-300 dark:hover:border-purple-500/30"
	},
	{
		day: "Mon - Fri",
		time: "8:00 AM - 9:00 AM",
		title: "Daily Devotion",
		description: "Start your morning with prayer and scripture to set the tone for your day.",
		icon: BookOpen,
		color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
		border: "hover:border-emerald-300 dark:hover:border-emerald-500/30"
	},
	{
		day: "Tuesday",
		time: "5:00 PM",
		title: "Virtuous Women Ministry",
		description: "A time of fellowship, encouragement, and prayer for the women.",
		icon: Heart,
		color: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400",
		border: "hover:border-rose-300 dark:hover:border-rose-500/30"
	},
	{
		day: "Wednesday",
		time: "9:00 AM - 4:00 PM",
		title: "Mid-week Prayer & Fasting",
		description: "Dedicated hours of pursuing God's presence in prayer and fasting.",
		icon: Flame,
		color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
		border: "hover:border-amber-300 dark:hover:border-amber-500/30"
	},
	{
		day: "Thursday",
		time: "4:30 PM - 5:30 PM",
		title: "Bible Study",
		description: "Deep dive into the Word of God together to grow in truth.",
		icon: FileText,
		color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
		border: "hover:border-blue-300 dark:hover:border-blue-500/30"
	},
	{
		day: "Friday",
		time: "5:00 PM",
		title: "Men of Honor Fellowship",
		description: "Empowering men to lead with integrity. Gather here at the church.",
		icon: Shield,
		color: "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
		border: "hover:border-slate-400 dark:hover:border-slate-500/30"
	}
];

export const aruCourses = [
	{
		title: "Diploma of Arts in Theology",
		qualification: "‘A’ Level certificate with 1 principle pass and 2 subsidiaries. OR an equivalent from an accredited institution.",
		schedule: "Saturdays from 8:00 AM - 5:00 PM"
	},
	{
		title: "Certificate in Theology",
		qualification: "Senior Four (4) certificate with credits in Math and English. OR an equivalent from an accredited institution.",
		schedule: "Saturdays 8:00 AM - 5:00 PM, Sundays 3:00 PM - 5:00 PM"
	},
	{
		title: "Certificate in Christian Ministry",
		qualification: "Ability to read and write.",
		schedule: "Modular: 10 days a semester."
	}
];