import { Button } from "@/components/ui/button"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"



export default function OneEvent2InfoCard({
    event_name,
    guest_email,
    event_date,
    event_time,
    event_charge,
    event_area,
    attendees,

}) {
  return (
    <div className="m-4 card bordered bg-blue-200 duration-200 hover:border-r-red">
        <div className="card-body">
            <h2 className="card-title">{event_name}</h2>
            <p>ゲスト: {guest_email}</p>
        </div>
    </div>
);
}