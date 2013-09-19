package acub.phonegap.plugin.test;

import com.phonegap.api.Plugin;
import com.phonegap.api.PluginResult;

public class PluginTest extends Plugin {
	@Override
    public PluginResult execute(String action, JSONArray data, String callbackId) {
        Log.d("SMSReadPlugin", "Plugin Called");
        PluginResult result = null;
        JSONObject messages = new JSONObject();
        if (action.equals("inbox")) {
            try {
                messages = readSMS("inbox");
                Log.d("SMSReadPlugin", "Returning " + messages.toString());
                result = new PluginResult(PluginResult.Status.OK, messages);
            } catch (JSONException jsonEx) {
                Log.d("SMSReadPlugin", "Got JSON Exception "+ jsonEx.getMessage());
                result = new PluginResult(PluginResult.Status.JSON_EXCEPTION);
            }
        }
        else if(action.equals("sent")){
             try {
                messages = readSMS("sent");
                Log.d("SMSReadPlugin", "Returning " + messages.toString());
                result = new PluginResult(PluginResult.Status.OK, messages);
            } catch (JSONException jsonEx) {
                Log.d("SMSReadPlugin", "Got JSON Exception "+ jsonEx.getMessage());
                result = new PluginResult(PluginResult.Status.JSON_EXCEPTION);
            }
        }
        else {
            result = new PluginResult(PluginResult.Status.INVALID_ACTION);
            Log.d("SMSReadPlugin", "Invalid action : "+action+" passed");
        }
        return result;
    }

}