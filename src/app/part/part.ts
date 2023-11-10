export class Part{
  /*
    {
            "created_on": "2023-08-30T08:01:44",
            "current_state@aras.name": "Preliminary",
            "generation": 1,
            "has_change_pending": "0",
            "id": "FB671233AE794093995D752E6D40030D",
            "is_current": "1",
            "is_released": "0",
            "keyed_name": "12345",
            "major_rev": "A",
            "make_buy": "Make",
            "modified_on": "2023-08-30T08:01:44",
            "name": "Wheel",
            "new_version": "0",
            "not_lockable": "0",
            "state": "Preliminary",
            "unit": "EA",
            "item_number": "12345",
            "itemtype": "4F1AC04A2B484F3ABA4E20DB63808A88"
        },
   */

   id!:string;
   part_number!:string;
   make_buy!:string;
   revision!:string;
   state!:string;
   cost!:string;
   raw_form!:string;
   name!:string;
   classification!:string;
   control_type!:string;

   //current_state@aras.name:any;
}
