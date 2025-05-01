import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Home, Settings, User } from "lucide-react";

const tabs = [
  {
    name: "Home",
    value: "home",
    icon: Home,
  },
  {
    name: "Profile",
    value: "profile",
    icon: User,
  },
  {
    name: "Messages",
    value: "messages",
    icon: Bot,
  },
  {
    name: "Settings",
    value: "settings",
    icon: Settings,
  },
];

export default function VerticalSeparatedTabsDemo() {
  return (
    <Tabs
      orientation="vertical"
      defaultValue={tabs[0].value}
      className="max-w-md w-full flex items-start gap-4 justify-center"
    >
      <TabsList className="shrink-0 grid grid-cols-1 gap-1 p-0 bg-white dark:bg-slate-950">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="data-[state=active]:bg-slate-900 data-[state=active]:text-slate-50 justify-start px-3 py-1.5 dark:data-[state=active]:bg-slate-50 dark:data-[state=active]:text-slate-900"
          >
            <tab.icon className="h-5 w-5 me-2" /> {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="h-40 flex items-center justify-center max-w-xs w-full border border-slate-200 rounded-md font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.name} Content
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}
