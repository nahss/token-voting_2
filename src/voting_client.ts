import algosdk from "algosdk";
import * as bkr from "beaker-ts";
export class Voting extends bkr.ApplicationClient {
    desc: string = "";
    override appSchema: bkr.Schema = { declared: { token_id: { type: bkr.AVMType.uint64, key: "token_id", desc: "", static: false }, reg_begin: { type: bkr.AVMType.uint64, key: "reg_begin", desc: "", static: false }, reg_end: { type: bkr.AVMType.uint64, key: "reg_end", desc: "", static: false }, vote_begin: { type: bkr.AVMType.uint64, key: "vote_begin", desc: "", static: false }, vote_end: { type: bkr.AVMType.uint64, key: "vote_end", desc: "", static: false }, vote_count: { type: bkr.AVMType.uint64, key: "vote_count", desc: "", static: false }, num_of_voters: { type: bkr.AVMType.uint64, key: "num_of_voters", desc: "", static: false } }, reserved: {} };
    override acctSchema: bkr.Schema = { declared: { can_vote: { type: bkr.AVMType.uint64, key: "can_vote", desc: "", static: false }, vote_choice: { type: bkr.AVMType.bytes, key: "vote_choice", desc: "", static: false }, vote_amount: { type: bkr.AVMType.uint64, key: "vote_amount", desc: "", static: false } }, reserved: {} };
    override approvalProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDgKaW50Y2Jsb2NrIDAgMSAxMDAwIDQKYnl0ZWNibG9jayAweDc0NmY2YjY1NmU1ZjY5NjQgMHg3NjZmNzQ2NTVmNjM2Zjc1NmU3NCAweDZlNzU2ZDVmNmY2NjVmNzY2Zjc0NjU3MjczIDB4NzY2Zjc0NjU1ZjYxNmQ2Zjc1NmU3NCAweDc2NmY3NDY1NWY2MjY1Njc2OTZlIDB4NzY2Zjc0NjU1ZjY1NmU2NCAweDc2NmY3NDY1NWY2MzY4NmY2OTYzNjUgMHg3MjY1Njc1ZjYyNjU2NzY5NmUgMHg3MjY1Njc1ZjY1NmU2NCAweDYzNjE2ZTVmNzY2Zjc0NjUgMHg3OTY1NzMgMHg2MTYyNzM3NDYxNjk2ZQp0eG4gTnVtQXBwQXJncwppbnRjXzAgLy8gMAo9PQpibnogbWFpbl9sMTgKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHg1YjRmYjk5MyAvLyAiY3JlYXRlX2Fzc2V0KHN0cmluZyxzdHJpbmcsdWludDY0LHVpbnQ2NCl2b2lkIgo9PQpibnogbWFpbl9sMTcKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHgyYjM0MTM5YSAvLyAiZ2V0X3Rva2VuX2lkKCl1aW50NjQiCj09CmJueiBtYWluX2wxNgp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweGFiYTBmMTEyIC8vICJvcHRpbl9hc3NldChheGZlcil2b2lkIgo9PQpibnogbWFpbl9sMTUKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHgyZmQ2NjQ1MiAvLyAidHJhbnNmZXJfYXNzZXQoYWRkcmVzcyx1aW50NjQsYXNzZXQpdm9pZCIKPT0KYm56IG1haW5fbDE0CnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4ZWY5ZGMyZWEgLy8gImNyZWF0ZV9yZWdpc3RyYXRpb25fYW5kX3ZvdGluZyh1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpdm9pZCIKPT0KYm56IG1haW5fbDEzCnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4NTk3ZmM3YzAgLy8gInJlZ2lzdGVyKCl2b2lkIgo9PQpibnogbWFpbl9sMTIKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHg4ZTBkNTJiYSAvLyAiaW5jcmVtZW50X3ZvdGUoKXZvaWQiCj09CmJueiBtYWluX2wxMQp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweGEwYTlkOGRiIC8vICJjYXN0X3ZvdGUoc3RyaW5nLGFzc2V0KXZvaWQiCj09CmJueiBtYWluX2wxMAplcnIKbWFpbl9sMTA6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKc3RvcmUgMTMKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgppbnRjXzAgLy8gMApnZXRieXRlCnN0b3JlIDE0CmxvYWQgMTMKbG9hZCAxNApjYWxsc3ViIGNhc3R2b3RlXzExCmludGNfMSAvLyAxCnJldHVybgptYWluX2wxMToKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKY2FsbHN1YiBpbmNyZW1lbnR2b3RlXzEwCmludGNfMSAvLyAxCnJldHVybgptYWluX2wxMjoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKY2FsbHN1YiByZWdpc3Rlcl85CmludGNfMSAvLyAxCnJldHVybgptYWluX2wxMzoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQpidG9pCnN0b3JlIDkKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgpidG9pCnN0b3JlIDEwCnR4bmEgQXBwbGljYXRpb25BcmdzIDMKYnRvaQpzdG9yZSAxMQp0eG5hIEFwcGxpY2F0aW9uQXJncyA0CmJ0b2kKc3RvcmUgMTIKbG9hZCA5CmxvYWQgMTAKbG9hZCAxMQpsb2FkIDEyCmNhbGxzdWIgY3JlYXRlcmVnaXN0cmF0aW9uYW5kdm90aW5nXzgKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDE0Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydAp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCnN0b3JlIDYKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgpidG9pCnN0b3JlIDcKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwppbnRjXzAgLy8gMApnZXRieXRlCnN0b3JlIDgKbG9hZCA2CmxvYWQgNwpsb2FkIDgKY2FsbHN1YiB0cmFuc2ZlcmFzc2V0XzcKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDE1Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydAp0eG4gR3JvdXBJbmRleAppbnRjXzEgLy8gMQotCnN0b3JlIDUKbG9hZCA1Cmd0eG5zIFR5cGVFbnVtCmludGNfMyAvLyBheGZlcgo9PQphc3NlcnQKbG9hZCA1CmNhbGxzdWIgb3B0aW5hc3NldF82CmludGNfMSAvLyAxCnJldHVybgptYWluX2wxNjoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKY2FsbHN1YiBnZXR0b2tlbmlkXzUKc3RvcmUgNApwdXNoYnl0ZXMgMHgxNTFmN2M3NSAvLyAweDE1MWY3Yzc1CmxvYWQgNAppdG9iCmNvbmNhdApsb2cKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDE3Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydAp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCnN0b3JlIDAKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgpzdG9yZSAxCnR4bmEgQXBwbGljYXRpb25BcmdzIDMKYnRvaQpzdG9yZSAyCnR4bmEgQXBwbGljYXRpb25BcmdzIDQKYnRvaQpzdG9yZSAzCmxvYWQgMApsb2FkIDEKbG9hZCAyCmxvYWQgMwpjYWxsc3ViIGNyZWF0ZWFzc2V0XzQKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDE4Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CmJueiBtYWluX2wyNAp0eG4gT25Db21wbGV0aW9uCmludGNfMSAvLyBPcHRJbgo9PQpibnogbWFpbl9sMjMKdHhuIE9uQ29tcGxldGlvbgpwdXNoaW50IDIgLy8gQ2xvc2VPdXQKPT0KYm56IG1haW5fbDIyCmVycgptYWluX2wyMjoKdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KYXNzZXJ0CmNhbGxzdWIgY2xlYXJ2b3RlXzMKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDIzOgp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQphc3NlcnQKY2FsbHN1YiBvcHRpbl8xCmludGNfMSAvLyAxCnJldHVybgptYWluX2wyNDoKdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKPT0KYXNzZXJ0CmNhbGxzdWIgY3JlYXRlXzAKaW50Y18xIC8vIDEKcmV0dXJuCgovLyBjcmVhdGUKY3JlYXRlXzA6CmJ5dGVjXzAgLy8gInRva2VuX2lkIgppbnRjXzAgLy8gMAphcHBfZ2xvYmFsX3B1dApieXRlYyA3IC8vICJyZWdfYmVnaW4iCmludGNfMCAvLyAwCmFwcF9nbG9iYWxfcHV0CmJ5dGVjIDggLy8gInJlZ19lbmQiCmludGNfMCAvLyAwCmFwcF9nbG9iYWxfcHV0CmJ5dGVjIDQgLy8gInZvdGVfYmVnaW4iCmludGNfMCAvLyAwCmFwcF9nbG9iYWxfcHV0CmJ5dGVjIDUgLy8gInZvdGVfZW5kIgppbnRjXzAgLy8gMAphcHBfZ2xvYmFsX3B1dApieXRlY18xIC8vICJ2b3RlX2NvdW50IgppbnRjXzAgLy8gMAphcHBfZ2xvYmFsX3B1dApieXRlY18yIC8vICJudW1fb2Zfdm90ZXJzIgppbnRjXzAgLy8gMAphcHBfZ2xvYmFsX3B1dApyZXRzdWIKCi8vIG9wdGluCm9wdGluXzE6CnR4biBTZW5kZXIKYnl0ZWMgOSAvLyAiY2FuX3ZvdGUiCmludGNfMCAvLyAwCmFwcF9sb2NhbF9wdXQKdHhuIFNlbmRlcgpieXRlYyA2IC8vICJ2b3RlX2Nob2ljZSIKYnl0ZWMgMTEgLy8gImFic3RhaW4iCmFwcF9sb2NhbF9wdXQKdHhuIFNlbmRlcgpieXRlY18zIC8vICJ2b3RlX2Ftb3VudCIKaW50Y18wIC8vIDAKYXBwX2xvY2FsX3B1dApyZXRzdWIKCi8vIGF1dGhfb25seQphdXRob25seV8yOgpnbG9iYWwgQ3JlYXRvckFkZHJlc3MKPT0KcmV0c3ViCgovLyBjbGVhcl92b3RlCmNsZWFydm90ZV8zOgpnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCmJ5dGVjIDQgLy8gInZvdGVfYmVnaW4iCmFwcF9nbG9iYWxfZ2V0Cj49CmFzc2VydApnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCmJ5dGVjIDUgLy8gInZvdGVfZW5kIgphcHBfZ2xvYmFsX2dldAo8PQphc3NlcnQKdHhuIFNlbmRlcgpieXRlYyA2IC8vICJ2b3RlX2Nob2ljZSIKYXBwX2xvY2FsX2dldApieXRlYyAxMCAvLyAieWVzIgo9PQpieiBjbGVhcnZvdGVfM19sMgpieXRlY18yIC8vICJudW1fb2Zfdm90ZXJzIgpieXRlY18yIC8vICJudW1fb2Zfdm90ZXJzIgphcHBfZ2xvYmFsX2dldAppbnRjXzEgLy8gMQotCmFwcF9nbG9iYWxfcHV0CmJ5dGVjXzEgLy8gInZvdGVfY291bnQiCmJ5dGVjXzEgLy8gInZvdGVfY291bnQiCmFwcF9nbG9iYWxfZ2V0CnR4biBTZW5kZXIKYnl0ZWNfMyAvLyAidm90ZV9hbW91bnQiCmFwcF9sb2NhbF9nZXQKLQphcHBfZ2xvYmFsX3B1dAp0eG4gU2VuZGVyCmJ5dGVjXzMgLy8gInZvdGVfYW1vdW50IgppbnRjXzAgLy8gMAphcHBfbG9jYWxfcHV0CmNsZWFydm90ZV8zX2wyOgp0eG4gU2VuZGVyCmJ5dGVjIDYgLy8gInZvdGVfY2hvaWNlIgpwdXNoYnl0ZXMgMHggLy8gIiIKYXBwX2xvY2FsX3B1dApyZXRzdWIKCi8vIGNyZWF0ZV9hc3NldApjcmVhdGVhc3NldF80OgpzdG9yZSAxOApzdG9yZSAxNwpzdG9yZSAxNgpzdG9yZSAxNQp0eG4gU2VuZGVyCmNhbGxzdWIgYXV0aG9ubHlfMgovLyB1bmF1dGhvcml6ZWQKYXNzZXJ0CmJ5dGVjXzAgLy8gInRva2VuX2lkIgphcHBfZ2xvYmFsX2dldAppbnRjXzAgLy8gMAo9PQphc3NlcnQKaXR4bl9iZWdpbgpwdXNoaW50IDMgLy8gYWNmZwppdHhuX2ZpZWxkIFR5cGVFbnVtCmxvYWQgMTUKZXh0cmFjdCAyIDAKaXR4bl9maWVsZCBDb25maWdBc3NldE5hbWUKbG9hZCAxNgpleHRyYWN0IDIgMAppdHhuX2ZpZWxkIENvbmZpZ0Fzc2V0VW5pdE5hbWUKbG9hZCAxNwppdHhuX2ZpZWxkIENvbmZpZ0Fzc2V0VG90YWwKbG9hZCAxOAppdHhuX2ZpZWxkIENvbmZpZ0Fzc2V0RGVjaW1hbHMKZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKaXR4bl9maWVsZCBDb25maWdBc3NldE1hbmFnZXIKaW50Y18yIC8vIDEwMDAKaXR4bl9maWVsZCBGZWUKaXR4bl9zdWJtaXQKYnl0ZWNfMCAvLyAidG9rZW5faWQiCml0eG4gQ3JlYXRlZEFzc2V0SUQKYXBwX2dsb2JhbF9wdXQKcmV0c3ViCgovLyBnZXRfdG9rZW5faWQKZ2V0dG9rZW5pZF81OgpieXRlY18wIC8vICJ0b2tlbl9pZCIKYXBwX2dsb2JhbF9nZXQKcmV0c3ViCgovLyBvcHRpbl9hc3NldApvcHRpbmFzc2V0XzY6CnN0b3JlIDE5Cmdsb2JhbCBHcm91cFNpemUKcHVzaGludCAyIC8vIDIKPT0KYXNzZXJ0CmxvYWQgMTkKZ3R4bnMgVHlwZUVudW0KaW50Y18zIC8vIGF4ZmVyCj09CmFzc2VydApsb2FkIDE5Cmd0eG5zIEFzc2V0QW1vdW50CmludGNfMCAvLyAwCj09CmFzc2VydApyZXRzdWIKCi8vIHRyYW5zZmVyX2Fzc2V0CnRyYW5zZmVyYXNzZXRfNzoKc3RvcmUgMjIKc3RvcmUgMjEKc3RvcmUgMjAKbG9hZCAyMApieXRlY18wIC8vICJ0b2tlbl9pZCIKYXBwX2dsb2JhbF9nZXQKYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCnN0b3JlIDIzCmludGNfMCAvLyAwCj49CmFzc2VydAppdHhuX2JlZ2luCmludGNfMyAvLyBheGZlcgppdHhuX2ZpZWxkIFR5cGVFbnVtCmxvYWQgMjAKaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCmJ5dGVjXzAgLy8gInRva2VuX2lkIgphcHBfZ2xvYmFsX2dldAppdHhuX2ZpZWxkIFhmZXJBc3NldApsb2FkIDIxCml0eG5fZmllbGQgQXNzZXRBbW91bnQKaW50Y18yIC8vIDEwMDAKaXR4bl9maWVsZCBGZWUKaXR4bl9zdWJtaXQKcmV0c3ViCgovLyBjcmVhdGVfcmVnaXN0cmF0aW9uX2FuZF92b3RpbmcKY3JlYXRlcmVnaXN0cmF0aW9uYW5kdm90aW5nXzg6CnN0b3JlIDI3CnN0b3JlIDI2CnN0b3JlIDI1CnN0b3JlIDI0CmJ5dGVjIDcgLy8gInJlZ19iZWdpbiIKZ2xvYmFsIExhdGVzdFRpbWVzdGFtcApsb2FkIDI0CisKYXBwX2dsb2JhbF9wdXQKYnl0ZWMgOCAvLyAicmVnX2VuZCIKZ2xvYmFsIExhdGVzdFRpbWVzdGFtcApsb2FkIDI1CisKYXBwX2dsb2JhbF9wdXQKYnl0ZWMgNCAvLyAidm90ZV9iZWdpbiIKZ2xvYmFsIExhdGVzdFRpbWVzdGFtcApsb2FkIDI2CisKYXBwX2dsb2JhbF9wdXQKYnl0ZWMgNSAvLyAidm90ZV9lbmQiCmdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKbG9hZCAyNworCmFwcF9nbG9iYWxfcHV0CnJldHN1YgoKLy8gcmVnaXN0ZXIKcmVnaXN0ZXJfOToKZ2xvYmFsIExhdGVzdFRpbWVzdGFtcApieXRlYyA3IC8vICJyZWdfYmVnaW4iCmFwcF9nbG9iYWxfZ2V0Cj49CmFzc2VydApnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCmJ5dGVjIDggLy8gInJlZ19lbmQiCmFwcF9nbG9iYWxfZ2V0Cjw9CmFzc2VydAp0eG4gU2VuZGVyCmJ5dGVjIDkgLy8gImNhbl92b3RlIgppbnRjXzEgLy8gMQphcHBfbG9jYWxfcHV0CnJldHN1YgoKLy8gaW5jcmVtZW50X3ZvdGUKaW5jcmVtZW50dm90ZV8xMDoKdHhuIFNlbmRlcgpieXRlY18wIC8vICJ0b2tlbl9pZCIKYXBwX2dsb2JhbF9nZXQKYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCnN0b3JlIDI5CnN0b3JlIDI4CmxvYWQgMjkKYXNzZXJ0CmxvYWQgMjgKaW50Y18yIC8vIDEwMDAKPj0KYXNzZXJ0CmJ5dGVjXzIgLy8gIm51bV9vZl92b3RlcnMiCmJ5dGVjXzIgLy8gIm51bV9vZl92b3RlcnMiCmFwcF9nbG9iYWxfZ2V0CmludGNfMSAvLyAxCisKYXBwX2dsb2JhbF9wdXQKYnl0ZWNfMSAvLyAidm90ZV9jb3VudCIKYnl0ZWNfMSAvLyAidm90ZV9jb3VudCIKYXBwX2dsb2JhbF9nZXQKbG9hZCAyOAorCmFwcF9nbG9iYWxfcHV0CnR4biBTZW5kZXIKYnl0ZWNfMyAvLyAidm90ZV9hbW91bnQiCmxvYWQgMjgKYXBwX2xvY2FsX3B1dApyZXRzdWIKCi8vIGNhc3Rfdm90ZQpjYXN0dm90ZV8xMToKc3RvcmUgMzEKc3RvcmUgMzAKZ2xvYmFsIExhdGVzdFRpbWVzdGFtcApieXRlYyA0IC8vICJ2b3RlX2JlZ2luIgphcHBfZ2xvYmFsX2dldAo+PQphc3NlcnQKZ2xvYmFsIExhdGVzdFRpbWVzdGFtcApieXRlYyA1IC8vICJ2b3RlX2VuZCIKYXBwX2dsb2JhbF9nZXQKPD0KYXNzZXJ0CnR4biBTZW5kZXIKYnl0ZWMgOSAvLyAiY2FuX3ZvdGUiCmFwcF9sb2NhbF9nZXQKaW50Y18xIC8vIDEKPT0KYXNzZXJ0CmxvYWQgMzAKZXh0cmFjdCAyIDAKYnl0ZWMgMTAgLy8gInllcyIKPT0KbG9hZCAzMApleHRyYWN0IDIgMApwdXNoYnl0ZXMgMHg2ZTZmIC8vICJubyIKPT0KfHwKbG9hZCAzMApleHRyYWN0IDIgMApieXRlYyAxMSAvLyAiYWJzdGFpbiIKPT0KfHwKYXNzZXJ0CmxvYWQgMzAKZXh0cmFjdCAyIDAKYnl0ZWMgMTAgLy8gInllcyIKPT0KYnogY2FzdHZvdGVfMTFfbDIKdHhuIFNlbmRlcgpieXRlY18wIC8vICJ0b2tlbl9pZCIKYXBwX2dsb2JhbF9nZXQKYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCnN0b3JlIDMzCnN0b3JlIDMyCmxvYWQgMzMKYXNzZXJ0CmxvYWQgMzIKaW50Y18yIC8vIDEwMDAKPj0KYXNzZXJ0CmJ5dGVjXzIgLy8gIm51bV9vZl92b3RlcnMiCmJ5dGVjXzIgLy8gIm51bV9vZl92b3RlcnMiCmFwcF9nbG9iYWxfZ2V0CmludGNfMSAvLyAxCisKYXBwX2dsb2JhbF9wdXQKYnl0ZWNfMSAvLyAidm90ZV9jb3VudCIKYnl0ZWNfMSAvLyAidm90ZV9jb3VudCIKYXBwX2dsb2JhbF9nZXQKbG9hZCAzMgorCmFwcF9nbG9iYWxfcHV0CnR4biBTZW5kZXIKYnl0ZWNfMyAvLyAidm90ZV9hbW91bnQiCmxvYWQgMzIKYXBwX2xvY2FsX3B1dApjYXN0dm90ZV8xMV9sMjoKdHhuIFNlbmRlcgpieXRlYyA2IC8vICJ2b3RlX2Nob2ljZSIKbG9hZCAzMApleHRyYWN0IDIgMAphcHBfbG9jYWxfcHV0CnJldHN1Yg==";
    override clearProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDgKaW50Y2Jsb2NrIDAgMQpieXRlY2Jsb2NrIDB4NzY2Zjc0NjU1ZjYzNjg2ZjY5NjM2NSAweDZlNzU2ZDVmNmY2NjVmNzY2Zjc0NjU3MjczIDB4NzY2Zjc0NjU1ZjYzNmY3NTZlNzQgMHg3NjZmNzQ2NTVmNjE2ZDZmNzU2ZTc0CnR4biBOdW1BcHBBcmdzCmludGNfMCAvLyAwCj09CmJueiBtYWluX2wyCmVycgptYWluX2wyOgpjYWxsc3ViIGNsZWFydm90ZV8wCmludGNfMSAvLyAxCnJldHVybgoKLy8gY2xlYXJfdm90ZQpjbGVhcnZvdGVfMDoKZ2xvYmFsIExhdGVzdFRpbWVzdGFtcApwdXNoYnl0ZXMgMHg3NjZmNzQ2NTVmNjI2NTY3Njk2ZSAvLyAidm90ZV9iZWdpbiIKYXBwX2dsb2JhbF9nZXQKPj0KYXNzZXJ0Cmdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKcHVzaGJ5dGVzIDB4NzY2Zjc0NjU1ZjY1NmU2NCAvLyAidm90ZV9lbmQiCmFwcF9nbG9iYWxfZ2V0Cjw9CmFzc2VydAp0eG4gU2VuZGVyCmJ5dGVjXzAgLy8gInZvdGVfY2hvaWNlIgphcHBfbG9jYWxfZ2V0CnB1c2hieXRlcyAweDc5NjU3MyAvLyAieWVzIgo9PQpieiBjbGVhcnZvdGVfMF9sMgpieXRlY18xIC8vICJudW1fb2Zfdm90ZXJzIgpieXRlY18xIC8vICJudW1fb2Zfdm90ZXJzIgphcHBfZ2xvYmFsX2dldAppbnRjXzEgLy8gMQotCmFwcF9nbG9iYWxfcHV0CmJ5dGVjXzIgLy8gInZvdGVfY291bnQiCmJ5dGVjXzIgLy8gInZvdGVfY291bnQiCmFwcF9nbG9iYWxfZ2V0CnR4biBTZW5kZXIKYnl0ZWNfMyAvLyAidm90ZV9hbW91bnQiCmFwcF9sb2NhbF9nZXQKLQphcHBfZ2xvYmFsX3B1dAp0eG4gU2VuZGVyCmJ5dGVjXzMgLy8gInZvdGVfYW1vdW50IgppbnRjXzAgLy8gMAphcHBfbG9jYWxfcHV0CmNsZWFydm90ZV8wX2wyOgp0eG4gU2VuZGVyCmJ5dGVjXzAgLy8gInZvdGVfY2hvaWNlIgpwdXNoYnl0ZXMgMHggLy8gIiIKYXBwX2xvY2FsX3B1dApyZXRzdWI=";
    override methods: algosdk.ABIMethod[] = [
        new algosdk.ABIMethod({ name: "create_asset", desc: "", args: [{ type: "string", name: "asset_name", desc: "" }, { type: "string", name: "unit_name", desc: "" }, { type: "uint64", name: "total_supply", desc: "" }, { type: "uint64", name: "decimals", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "get_token_id", desc: "", args: [], returns: { type: "uint64", desc: "" } }),
        new algosdk.ABIMethod({ name: "optin_asset", desc: "", args: [{ type: "axfer", name: "opt_txn", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "transfer_asset", desc: "", args: [{ type: "address", name: "receiver", desc: "" }, { type: "uint64", name: "amount", desc: "" }, { type: "asset", name: "a_id", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "create_registration_and_voting", desc: "", args: [{ type: "uint64", name: "reg_begin", desc: "" }, { type: "uint64", name: "reg_end", desc: "" }, { type: "uint64", name: "vote_begin", desc: "" }, { type: "uint64", name: "vote_end", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "register", desc: "", args: [], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "increment_vote", desc: "", args: [], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "cast_vote", desc: "", args: [{ type: "string", name: "vote_choice", desc: "" }, { type: "asset", name: "a_id", desc: "" }], returns: { type: "void", desc: "" } })
    ];
    async create_asset(args: {
        asset_name: string;
        unit_name: string;
        total_supply: bigint;
        decimals: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.create_asset({ asset_name: args.asset_name, unit_name: args.unit_name, total_supply: args.total_supply, decimals: args.decimals }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async get_token_id(txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<bigint>> {
        const result = await this.execute(await this.compose.get_token_id(txnParams));
        return new bkr.ABIResult<bigint>(result, result.returnValue as bigint);
    }
    async optin_asset(args: {
        opt_txn: algosdk.TransactionWithSigner | algosdk.Transaction;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.optin_asset({ opt_txn: args.opt_txn }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async transfer_asset(args: {
        receiver: string;
        amount: bigint;
        a_id?: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.transfer_asset({ receiver: args.receiver, amount: args.amount, a_id: args.a_id === undefined ? await this._resolve("global-state", "token_id") as bigint : args.a_id }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async create_registration_and_voting(args: {
        reg_begin: bigint;
        reg_end: bigint;
        vote_begin: bigint;
        vote_end: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.create_registration_and_voting({ reg_begin: args.reg_begin, reg_end: args.reg_end, vote_begin: args.vote_begin, vote_end: args.vote_end }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async register(txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.register(txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async increment_vote(txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.increment_vote(txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async cast_vote(args: {
        vote_choice: string;
        a_id?: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.cast_vote({ vote_choice: args.vote_choice, a_id: args.a_id === undefined ? await this._resolve("global-state", "token_id") as bigint : args.a_id }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    compose = {
        create_asset: async (args: {
            asset_name: string;
            unit_name: string;
            total_supply: bigint;
            decimals: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "create_asset"), { asset_name: args.asset_name, unit_name: args.unit_name, total_supply: args.total_supply, decimals: args.decimals }, txnParams, atc);
        },
        get_token_id: async (txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "get_token_id"), {}, txnParams, atc);
        },
        optin_asset: async (args: {
            opt_txn: algosdk.TransactionWithSigner | algosdk.Transaction;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "optin_asset"), { opt_txn: args.opt_txn }, txnParams, atc);
        },
        transfer_asset: async (args: {
            receiver: string;
            amount: bigint;
            a_id?: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "transfer_asset"), { receiver: args.receiver, amount: args.amount, a_id: args.a_id === undefined ? await this._resolve("global-state", "token_id") : args.a_id }, txnParams, atc);
        },
        create_registration_and_voting: async (args: {
            reg_begin: bigint;
            reg_end: bigint;
            vote_begin: bigint;
            vote_end: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "create_registration_and_voting"), { reg_begin: args.reg_begin, reg_end: args.reg_end, vote_begin: args.vote_begin, vote_end: args.vote_end }, txnParams, atc);
        },
        register: async (txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "register"), {}, txnParams, atc);
        },
        increment_vote: async (txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "increment_vote"), {}, txnParams, atc);
        },
        cast_vote: async (args: {
            vote_choice: string;
            a_id?: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "cast_vote"), { vote_choice: args.vote_choice, a_id: args.a_id === undefined ? await this._resolve("global-state", "token_id") : args.a_id }, txnParams, atc);
        }
    };
}
