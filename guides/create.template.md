**Add channels**
You need a public channel and a private channel to start signups.
Public channels are used for sign-ups and round announcements.
```
munin!addchannel {}|public```
Private channels are used for player decks and operational messages.
```
munin!addchannel {}|private```
You remove channels if you make a mistake.
```
munin!removechannel {}|public```
The above commands affect the _current_ channel.
**Add hosts**
Hosts have all the same permissions you do.
Trust them like you would a moderator.
```
munin!addhost {}|@discordtag
munin!removehost {}|@discordtag```
**Change info**
You can change the name and description.
```
munin!update {}|New Name|A new description```
You can check and change the priority for the systems Challonge uses to break ties.
```
munin!tb {}
munin!tb {}|tb1|tb2|tb3```
You can set a smaller capacity than Challonge Standard: https://challonge.com/pricing
```
munin!capacity {}|limit```
**Open sign-ups**
This posts the registration message to all public channels.
Further details on your next steps will be sent to private channels.
```
munin!open {}```
