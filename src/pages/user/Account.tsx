import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import ChangePassword from "@/components/user/account/ChangePassword";
import Profile from "@/components/user/account/Profile";

const tabs = [
  { value: "profile", label: "Hồ sơ", component: <Profile /> },
  { value: "change-password", label: "Đổi mật khẩu", component: <ChangePassword /> },
]

const Account = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-blue-800 dark:to-cyan-800">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList
            className="w-full flex gap-3 rounded-xl border border-gray-200/50 bg-white/80 backdrop-blur-sm shadow-sm p-1 
               dark:border-gray-700/50 dark:bg-gray-800/80"
          >
            {
              tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg transition-all
                 hover:text-cyan-600 hover:bg-cyan-50
                 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500
                 data-[state=active]:text-white shadow-sm
                 dark:text-gray-200 dark:hover:text-cyan-400 dark:hover:bg-cyan-900/20
                 dark:data-[state=active]:from-cyan-600 dark:data-[state=active]:to-blue-600"
                >
                  {tab.label}
                </TabsTrigger>
              ))
            }
          </TabsList>
          {
            tabs.map((tab) => (<TabsContent key={tab.value} value={tab.value}>
              <Card className="border-gray-200/50 bg-white/80 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/80">
                {tab.component}
              </Card>
            </TabsContent>))
          }
        </Tabs>

      </div>
    </div>
  );
};

export default Account;
